"use client";
import React, { useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export type Product3DType = "pillow" | "rug" | "canvas" | "metal" | "tapestry";

export interface Product3DCardProps {
  type: Product3DType;
  label: string;
  size: string;
  imageUrl: string | null;
}

const CARD_ASPECT: Record<Product3DType, string> = {
  pillow:   "1 / 1",
  rug:      "4 / 3",
  canvas:   "3 / 4",
  metal:    "1 / 1",
  tapestry: "2 / 3",
};

const CAMERA_POS: Record<Product3DType, [number, number, number]> = {
  pillow:   [0,    0.1, 3.6],
  rug:      [0,    2.4, 1.6],
  canvas:   [0.9,  0.2, 3.2],
  metal:    [0.9,  0.2, 3.2],
  tapestry: [0.6,  0.1, 4.0],
};

/* Load + dispose design texture */
function useDesignTexture(url: string | null) {
  const tex = useMemo(() => {
    if (!url) return null;
    const t = new THREE.TextureLoader().load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [url]);
  useEffect(() => () => { tex?.dispose(); }, [tex]);
  return tex;
}

/* ─── Pillow ─────────────────────────────────────────────────────
   A sphere scaled flat in Z is the standard 3D pillow shape —
   it gives naturally puffy edges and a correct side profile.
   Design texture goes on a flat overlay plane at the front face.  */
function PillowMesh({ tex, aspect }: { tex: THREE.Texture | null; aspect: number }) {
  const MAX  = 1.75;
  const pw   = aspect >= 1 ? MAX : MAX * aspect;
  const ph   = aspect >= 1 ? MAX / aspect : MAX;
  // Total depth ≈ 33% of smaller dimension (realistic throw pillow ratio)
  const pd   = Math.min(pw, ph) * 0.33;
  // Design overlay sits just clear of the front surface
  const dz   = pd / 2 + 0.018;

  return (
    <group>
      {/* Squished sphere — pillow body, white fabric */}
      <mesh scale={[pw / 2, ph / 2, pd / 2]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial color="#f4f2ef" roughness={0.91} metalness={0} />
      </mesh>
      {/* Design: flat plane overlaid on front face, inset from edges */}
      {tex && (
        <mesh position={[0, 0, dz]}>
          <planeGeometry args={[pw * 0.74, ph * 0.74]} />
          <meshStandardMaterial map={tex} roughness={0.87} metalness={0} />
        </mesh>
      )}
    </group>
  );
}

/* ─── Rug (flat, viewed from slight above angle) ────────────────
   Thin slab with design on top face                              */
function RugMesh({ tex, aspect }: { tex: THREE.Texture | null; aspect: number }) {
  const MAX = 2.0;
  const rw  = aspect >= 1 ? MAX : MAX * aspect;
  const rd  = aspect >= 1 ? MAX / aspect : MAX; // depth (Z)
  const ry  = 0.022; // thickness

  return (
    // Tilt toward viewer so flat surface reads clearly
    <group rotation={[-0.48, 0.0, 0]}>
      {/* Rug slab */}
      <mesh>
        <boxGeometry args={[rw, ry, rd]} />
        {/* top face (+Y = index 2) gets the design */}
        <meshStandardMaterial attach="material-0" color="#d8d0c8" roughness={0.95} />
        <meshStandardMaterial attach="material-1" color="#d8d0c8" roughness={0.95} />
        <meshStandardMaterial
          attach="material-2"
          map={tex}
          color={tex ? "#ffffff" : "#d8d0c8"}
          roughness={0.92}
          metalness={0}
        />
        <meshStandardMaterial attach="material-3" color="#b8b0a8" roughness={0.95} />
        <meshStandardMaterial attach="material-4" color="#ccc4bc" roughness={0.95} />
        <meshStandardMaterial attach="material-5" color="#b8b0a8" roughness={0.95} />
      </mesh>
      {/* Subtle underside shadow */}
      <ContactShadows
        position={[0, -ry / 2 - 0.01, 0]}
        opacity={0.18}
        scale={[rw + 0.3, rd + 0.3]}
        blur={1.5}
        far={0.2}
      />
    </group>
  );
}

/* ─── Canvas Art ─────────────────────────────────────────────────
   Portrait box: design on front face, wood-wrapped edges          */
function CanvasArtMesh({ tex, aspect }: { tex: THREE.Texture | null; aspect: number }) {
  const MAX = 1.7;
  const cw  = aspect >= 1 ? MAX : MAX * aspect;
  const ch  = aspect >= 1 ? MAX / aspect : MAX;
  const cd  = 0.09; // depth (canvas stretcher thickness)
  const wood = "#7a5230";

  return (
    <group>
      <mesh>
        <boxGeometry args={[cw, ch, cd]} />
        {/* sides: natural wood */}
        <meshStandardMaterial attach="material-0" color={wood} roughness={0.82} metalness={0} />
        <meshStandardMaterial attach="material-1" color={wood} roughness={0.82} metalness={0} />
        <meshStandardMaterial attach="material-2" color={wood} roughness={0.82} metalness={0} />
        <meshStandardMaterial attach="material-3" color={wood} roughness={0.82} metalness={0} />
        {/* front face (+Z = index 4): canvas print */}
        <meshStandardMaterial
          attach="material-4"
          map={tex}
          color={tex ? "#faf8f5" : "#f0ece6"}
          roughness={0.78}
          metalness={0}
        />
        {/* back */}
        <meshStandardMaterial attach="material-5" color="#3a2a18" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

/* ─── Metal Art (Displate-style) ─────────────────────────────────
   Glossy metal panel, design printed on front, chrome edges       */
function MetalArtMesh({ tex, aspect }: { tex: THREE.Texture | null; aspect: number }) {
  const MAX = 1.65;
  const mw  = aspect >= 1 ? MAX : MAX * aspect;
  const mh  = aspect >= 1 ? MAX / aspect : MAX;
  const md  = 0.038;
  const edge = "#686868";

  return (
    <group>
      <mesh>
        <boxGeometry args={[mw, mh, md]} />
        <meshStandardMaterial attach="material-0" color={edge} roughness={0.18} metalness={0.92} />
        <meshStandardMaterial attach="material-1" color={edge} roughness={0.18} metalness={0.92} />
        <meshStandardMaterial attach="material-2" color={edge} roughness={0.18} metalness={0.92} />
        <meshStandardMaterial attach="material-3" color={edge} roughness={0.18} metalness={0.92} />
        {/* front face — high-gloss metal print */}
        <meshStandardMaterial
          attach="material-4"
          map={tex}
          color={tex ? "#ffffff" : "#c8c8c8"}
          roughness={0.08}
          metalness={0.55}
        />
        <meshStandardMaterial attach="material-5" color="#3a3a3a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Floating mount gap — tiny shadow strip at bottom */}
      <mesh position={[0, -mh / 2 - 0.015, -md / 2 - 0.004]}>
        <boxGeometry args={[mw, 0.008, 0.005]} />
        <meshStandardMaterial color="#111" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

/* ─── Wall Tapestry with wood rod ────────────────────────────────
   Fabric panel hanging from a turned wood dowel                   */
function TapestryMesh({ tex, aspect }: { tex: THREE.Texture | null; aspect: number }) {
  const fw  = 1.55;
  const fh  = aspect < 1 ? fw / aspect : fw * 0.8; // usually portrait
  const wood = "#7a4a1e";
  const rodY = fh / 2 + 0.04;

  return (
    <group>
      {/* Fabric */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[fw, fh]} />
        <meshStandardMaterial
          map={tex}
          color={tex ? "#ffffff" : "#e8e4de"}
          roughness={0.90}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Back of fabric — plain linen */}
      <mesh position={[0, 0, -0.004]}>
        <planeGeometry args={[fw, fh]} />
        <meshStandardMaterial color="#d4cfc8" roughness={0.95} metalness={0} side={THREE.BackSide} />
      </mesh>
      {/* Wood rod */}
      <mesh position={[0, rodY, 0.025]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.048, 0.048, fw + 0.24, 20]} />
        <meshStandardMaterial color={wood} roughness={0.72} metalness={0} />
      </mesh>
      {/* End knobs */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * (fw / 2 + 0.14), rodY, 0.025]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color={wood} roughness={0.68} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Scene (runs inside Canvas) ──────────────────────────────── */
type MeshComp = (p: { tex: THREE.Texture | null; aspect: number }) => React.ReactElement;

const MESHES: Record<Product3DType, MeshComp> = {
  pillow:   PillowMesh,
  rug:      RugMesh,
  canvas:   CanvasArtMesh,
  metal:    MetalArtMesh,
  tapestry: TapestryMesh,
};

const SHADOW_Y: Record<Product3DType, number> = {
  pillow: -1.05, rug: -0.04, canvas: -1.0, metal: -0.95, tapestry: -1.1,
};

function Scene({
  type, imageUrl, imgAspect,
}: { type: Product3DType; imageUrl: string | null; imgAspect: number }) {
  const tex  = useDesignTexture(imageUrl);
  const Mesh = MESHES[type];

  return (
    <>
      {/* Studio HDR environment — soft, neutral, white */}
      <Environment preset="studio" />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <directionalLight position={[-4, 2, -2]} intensity={0.18} color="#ddeeff" />

      <Mesh tex={tex} aspect={imgAspect} />

      <ContactShadows
        position={[0, SHADOW_Y[type], 0]}
        opacity={0.28}
        scale={4}
        blur={2.2}
        far={1.8}
        color="#222222"
      />
    </>
  );
}

/* ─── Public card ─────────────────────────────────────────────── */
export default function Product3DCard({ type, label, size, imageUrl }: Product3DCardProps) {
  const [imgAspect, setImgAspect] = useState(1);

  useEffect(() => {
    if (!imageUrl) { setImgAspect(1); return; }
    const img = new window.Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setImgAspect(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <div className="flex flex-col gap-2.5">
      <div style={{ width: "100%", aspectRatio: CARD_ASPECT[type], position: "relative" }}>
        <Canvas
          camera={{ position: CAMERA_POS[type], fov: 40 }}
          gl={{ antialias: true, alpha: false }}
          style={{ position: "absolute", inset: 0, background: "#ffffff" }}
          frameloop="always"
        >
          <Scene type={type} imageUrl={imageUrl} imgAspect={imgAspect} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.4}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 1.9}
          />
        </Canvas>
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{size}</p>
      </div>
    </div>
  );
}
