"use client";
import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

/* ── Shader: warm amber-gold lava lamp ────────────────────────────
   Warm near-black base. Blobs are rich amber and molten gold —
   feels like warm product-photography studio lighting, not cold chrome. */
const FRAG = `
precision mediump float;

uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform vec4  u_clicks[8];

void main() {
  vec2 uv    = gl_FragCoord.xy / u_res;
  vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - u_mouse.y / u_res.y);
  float t    = u_time;

  /* warm near-black base — no cold gray tint */
  vec3 col = vec3(0.055, 0.044, 0.028);

  vec2 p0 = vec2(0.32 + 0.16*sin(t*0.055 + 0.0),  0.50 + 0.38*sin(t*0.042 + 1.2));
  vec2 p1 = vec2(0.68 + 0.14*cos(t*0.048 + 2.5),  0.50 + 0.40*cos(t*0.038 + 0.8));
  vec2 p2 = vec2(0.50 + 0.10*sin(t*0.062 + 1.0),  0.32 + 0.30*sin(t*0.051 + 3.5));
  vec2 p3 = vec2(0.20 + 0.13*cos(t*0.045 + 0.5),  0.58 + 0.32*cos(t*0.058 + 2.0));
  vec2 p4 = vec2(0.80 + 0.11*sin(t*0.052 + 1.8),  0.44 + 0.34*sin(t*0.065 + 0.3));

  float s2 = 2.0 * 0.24 * 0.24;
  vec2 dv;

  /* amber-gold blobs */
  dv = uv - p0; col += vec3(0.55, 0.36, 0.06) * exp(-dot(dv,dv)/s2) * 0.60;
  dv = uv - p1; col += vec3(0.45, 0.28, 0.04) * exp(-dot(dv,dv)/(s2*0.9)) * 0.54;
  dv = uv - p2; col += vec3(0.64, 0.46, 0.09) * exp(-dot(dv,dv)/(s2*0.8)) * 0.50;
  dv = uv - p3; col += vec3(0.40, 0.24, 0.03) * exp(-dot(dv,dv)/(s2*1.1)) * 0.48;
  dv = uv - p4; col += vec3(0.52, 0.34, 0.07) * exp(-dot(dv,dv)/s2) * 0.52;

  /* mouse: warm golden brightening */
  float ms2 = 2.0 * 0.28 * 0.28;
  dv = uv - mouse;
  float mw = exp(-dot(dv,dv)/ms2) * 0.28;
  col = col + col * mw * 0.7 + vec3(0.22, 0.15, 0.04) * mw;

  /* click: warm gold burst */
  for(int i=0;i<8;i++){
    if(u_clicks[i].w > 0.5){
      float age = t - u_clicks[i].z;
      if(age >= 0.0 && age < 0.9){
        vec2 cp = vec2(u_clicks[i].x/u_res.x, 1.0 - u_clicks[i].y/u_res.y);
        float fade = max(0.0, 1.0 - age/0.9);
        dv = uv - cp;
        float glow = exp(-dot(dv,dv)/(2.0*0.034*0.034));
        col += vec3(0.68, 0.50, 0.14) * glow * fade * 0.88;
      }
    }
  }

  float vig = 1.0 - dot(uv - 0.5, uv - 0.5) * 0.62;
  col *= clamp(vig, 0.28, 1.0);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; }
  return s;
}
function link(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(p)); return null; }
  return p;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = link(gl, vs, fs);
    if (!prog) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes    = gl.getUniformLocation(prog, "u_res");
    const uMouse  = gl.getUniformLocation(prog, "u_mouse");
    const uTime   = gl.getUniformLocation(prog, "u_time");
    const uClicks = gl.getUniformLocation(prog, "u_clicks[0]");

    const start = performance.now();
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse  = { x: target.x, y: target.y };

    const MAX_C = 8;
    const clicks: Array<{ x: number; y: number; t: number }> = [];
    const clickData = new Float32Array(MAX_C * 4);
    let raf: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove     = (e: MouseEvent) => { target.x = e.clientX; target.y = e.clientY; };
    const onClick    = (e: MouseEvent) => {
      const t = (performance.now() - start) / 1000;
      if (clicks.length >= MAX_C) clicks.shift();
      clicks.push({ x: e.clientX, y: e.clientY, t });
    };
    const onTouch    = (e: TouchEvent) => {
      if (e.touches.length > 0) { target.x = e.touches[0].clientX; target.y = e.touches[0].clientY; }
    };
    const onTouchTap = (e: TouchEvent) => {
      const t = (performance.now() - start) / 1000;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (clicks.length >= MAX_C) clicks.shift();
        clicks.push({ x: e.changedTouches[i].clientX, y: e.changedTouches[i].clientY, t });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click",     onClick);
    window.addEventListener("touchmove", onTouch,    { passive: true });
    window.addEventListener("touchend",  onTouchTap, { passive: true });

    const render = () => {
      const t = (performance.now() - start) / 1000;
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;

      for (let i = 0; i < MAX_C; i++) {
        if (i < clicks.length) {
          clickData[i*4+0] = clicks[i].x; clickData[i*4+1] = clicks[i].y;
          clickData[i*4+2] = clicks[i].t; clickData[i*4+3] = 1.0;
        } else { clickData[i*4+3] = 0.0; }
      }

      gl.useProgram(prog);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x * (canvas.width  / window.innerWidth),
                           mouse.y * (canvas.height / window.innerHeight));
      gl.uniform1f(uTime,  t);
      gl.uniform4fv(uClicks, clickData);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend",  onTouchTap);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
