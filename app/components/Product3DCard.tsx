"use client";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type Product3DType = "pillow" | "rug" | "canvas" | "metal" | "tapestry";

export interface Product3DCardProps {
  type: Product3DType;
  label: string;
  size: string;
  imageUrl: string | null;
}

/* Load texture from URL, dispose on cleanup */
function useDesignTexture(imageUrl: string | null): THREE.Texture | null {
  const texture = useMemo(() => {
    if (!imageUrl) return null;
    const tex = new THREE.TextureLoader().load(imageUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [imageUrl]);
  useEffect(() => () => { texture?.dispose(); }, [texture]);
  return texture;
}

/* ── Pillow ───────────────────────────────────────── */
function PillowMesh({ texture }: { texture: THREE.Texture | null }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.35;
    ref.current.rotation.x = 0.08 + Math.sin(t * 0.28) * 0.06;
  });
  return (
    <group ref={ref} rotation={[0.1, 0.2, 0]}>
      <RoundedBox args={[1.8, 1.8, 0.58]} radius={0.26} smoothness={10}>
        <meshStandardMaterial
          map={texture}
          color={texture ? "#ffffff" : "#1c1c1c"}
          roughness={0.85}
          metalness={0}
        />
      </RoundedBox>
    </group>
  );
}

/* ── Rug (flat, viewed from slightly above) ──────── */
function RugMesh({ texture }: { texture: THREE.Texture | null }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.2;
  });
  const side = "#1a1a1a";
  return (
    <group ref={ref} rotation={[-0.52, 0, 0]}>
      <mesh>
        {/* width × thickness × depth — thin flat slab */}
        <boxGeometry args={[2.2, 0.03, 1.55]} />
        <meshStandardMaterial attach="material-0" color={side} roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={side} roughness={0.9} />
        {/* top face (+Y) — receives the design */}
        <meshStandardMaterial attach="material-2" map={texture} color={texture ? "#ffffff" : side} roughness={0.9} metalness={0} />
        <meshStandardMaterial attach="material-3" color="#111" roughness={0.9} />
        <meshStandardMaterial attach="material-4" color={side} roughness={0.9} />
        <meshStandardMaterial attach="material-5" color="#111" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ── Canvas Art (portrait, wood-wrapped edges) ────── */
function CanvasArtMesh({ texture }: { texture: THREE.Texture | null }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.3;
  });
  const wood = "#5a3320";
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.45, 1.85, 0.08]} />
        <meshStandardMaterial attach="material-0" color={wood} roughness={0.85} metalness={0} />
        <meshStandardMaterial attach="material-1" color={wood} roughness={0.85} metalness={0} />
        <meshStandardMaterial attach="material-2" color={wood} roughness={0.85} metalness={0} />
        <meshStandardMaterial attach="material-3" color={wood} roughness={0.85} metalness={0} />
        {/* front face (+Z) — receives the design */}
        <meshStandardMaterial attach="material-4" map={texture} color={texture ? "#f5f0e8" : "#e0d8cc"} roughness={0.72} metalness={0} />
        <meshStandardMaterial attach="material-5" color="#1a1a1a" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

/* ── Metal Art (square, high gloss edges) ──────────── */
function MetalArtMesh({ texture }: { texture: THREE.Texture | null }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.32;
  });
  const chrome = "#888888";
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.55, 1.55, 0.045]} />
        <meshStandardMaterial attach="material-0" color={chrome} roughness={0.28} metalness={0.88} />
        <meshStandardMaterial attach="material-1" color={chrome} roughness={0.28} metalness={0.88} />
        <meshStandardMaterial attach="material-2" color={chrome} roughness={0.28} metalness={0.88} />
        <meshStandardMaterial attach="material-3" color={chrome} roughness={0.28} metalness={0.88} />
        {/* front face (+Z) — receives the design */}
        <meshStandardMaterial attach="material-4" map={texture} color={texture ? "#ffffff" : "#aaaaaa"} roughness={0.22} metalness={0.6} />
        <meshStandardMaterial attach="material-5" color="#444" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

/* ── Wall Tapestry with wood rod ─────────────────── */
function TapestryMesh({ texture }: { texture: THREE.Texture | null }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.22;
  });
  const wood = "#6b3f1a";
  return (
    <group ref={ref}>
      {/* Fabric panel */}
      <mesh position={[0, -0.08, 0]}>
        <planeGeometry args={[1.6, 2.05]} />
        <meshStandardMaterial
          map={texture}
          color={texture ? "#ffffff" : "#1e1e1e"}
          roughness={0.88}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Wooden rod */}
      <mesh position={[0, 1.04, 0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 1.8, 18]} />
        <meshStandardMaterial color={wood} roughness={0.76} metalness={0} />
      </mesh>
      {/* End knobs */}
      {([-0.92, 0.92] as const).map((x) => (
        <mesh key={x} position={[x, 1.04, 0.06]}>
          <sphereGeometry args={[0.078, 14, 14]} />
          <meshStandardMaterial color={wood} roughness={0.7} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Config per product type ─────────────────────── */
type MeshComp = (props: { texture: THREE.Texture | null }) => React.ReactElement;

const MESHES: Record<Product3DType, MeshComp> = {
  pillow:   PillowMesh,
  rug:      RugMesh,
  canvas:   CanvasArtMesh,
  metal:    MetalArtMesh,
  tapestry: TapestryMesh,
};

const CAM_Z: Record<Product3DType, number> = {
  pillow: 3.2, rug: 3.5, canvas: 3.2, metal: 3.2, tapestry: 3.8,
};

const ASPECT: Record<Product3DType, string> = {
  pillow: "1 / 1", rug: "4 / 3", canvas: "3 / 4", metal: "1 / 1", tapestry: "2 / 3",
};

/* ── Scene (runs inside Canvas) ──────────────────── */
function Scene({ type, imageUrl }: { type: Product3DType; imageUrl: string | null }) {
  const texture = useDesignTexture(imageUrl);
  const Mesh = MESHES[type];
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.3} castShadow={false} />
      <directionalLight position={[-3, 0, -3]} intensity={0.28} color="#c0cfff" />
      <Mesh texture={texture} />
    </>
  );
}

/* ── Public card component ───────────────────────── */
export default function Product3DCard({ type, label, size, imageUrl }: Product3DCardProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div style={{ width: "100%", aspectRatio: ASPECT[type], position: "relative" }}>
        <Canvas
          camera={{ position: [0, 0, CAM_Z[type]], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", inset: 0, background: "transparent" }}
          frameloop="always"
        >
          <Scene type={type} imageUrl={imageUrl} />
        </Canvas>
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{size}</p>
      </div>
    </div>
  );
}
