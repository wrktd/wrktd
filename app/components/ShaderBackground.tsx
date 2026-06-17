"use client";
import { useEffect, useRef } from "react";

/* ── Shaders ───────────────────────────────────────────────────── */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_speed;
uniform vec4  u_clicks[8];

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i),           hash(i+vec2(1,0)), u.x),
    mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=0.5; }
  return v;
}

void main() {
  vec2 uv    = gl_FragCoord.xy / u_res;
  vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - u_mouse.y / u_res.y);
  float t    = u_time;

  /* — drifting orbs — */
  vec2 o[5];
  o[0] = vec2(0.20 + 0.18*sin(t*0.21), 0.30 + 0.22*cos(t*0.17));
  o[1] = vec2(0.78 + 0.14*cos(t*0.19), 0.70 + 0.16*sin(t*0.23));
  o[2] = vec2(0.50 + 0.22*sin(t*0.13), 0.18 + 0.14*cos(t*0.29));
  o[3] = vec2(0.15 + 0.10*cos(t*0.31), 0.80 + 0.12*sin(t*0.37));
  o[4] = vec2(0.85 + 0.10*sin(t*0.27), 0.40 + 0.20*cos(t*0.41));

  float field = 0.0;
  float w[5];
  w[0]=0.90; w[1]=0.85; w[2]=0.70; w[3]=0.75; w[4]=0.65;
  for(int i=0;i<5;i++){
    float d2 = dot(uv-o[i], uv-o[i]);
    field += w[i] * 0.032 / (d2 + 0.025);
  }

  /* — mouse light — */
  float md2   = dot(uv-mouse, uv-mouse);
  field += 0.055 / (md2 + 0.015);
  field += u_speed * 0.04 / (md2 + 0.03);

  /* — organic noise layer — */
  float n  = fbm(uv*3.5 + vec2(t*0.07, t*0.05));
  float n2 = fbm(uv*6.0 - vec2(t*0.04, t*0.09));
  field += n  * 0.10;
  field += n2 * 0.04;

  /* — click ripples — */
  for(int i=0;i<8;i++){
    if(u_clicks[i].w > 0.5){
      float age = t - u_clicks[i].z;
      if(age >= 0.0 && age < 2.8){
        vec2 cp  = vec2(u_clicks[i].x/u_res.x, 1.0 - u_clicks[i].y/u_res.y);
        float d  = length(uv - cp);
        float fade = pow(max(0.0, 1.0 - age/2.8), 1.4);

        /* outer ring */
        float r1 = age * 0.42;
        float ring1 = smoothstep(0.014, 0.0, abs(d - r1));
        /* inner echo ring */
        float r2 = age * 0.26;
        float ring2 = smoothstep(0.008, 0.0, abs(d - r2)) * 0.45;
        /* center burst that fades quickly */
        float burst = smoothstep(0.06, 0.0, d) * max(0.0, 1.0 - age*4.0) * 0.6;

        field += (ring1 + ring2 + burst) * fade * 0.65;
      }
    }
  }

  field = clamp(field, 0.0, 1.0);

  /* — tone map to near-black range — */
  float b = 0.018 + field * 0.30;

  /* — subtle vignette — */
  float vig = 1.0 - dot(uv-0.5, uv-0.5) * 1.1;
  b *= clamp(vig, 0.0, 1.0);

  /* — faint horizontal scan-line shimmer — */
  float scan = sin(gl_FragCoord.y * 2.8 + t * 0.5) * 0.006;
  b += scan * field;

  gl_FragColor = vec4(vec3(b), 1.0);
}
`;

/* ── WebGL helpers ─────────────────────────────────────────────── */
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

function link(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

/* ── Component ─────────────────────────────────────────────────── */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER,   VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = link(gl, vs, fs);
    if (!prog) return;

    /* full-screen quad */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    /* uniform locations */
    const uRes    = gl.getUniformLocation(prog, "u_res");
    const uMouse  = gl.getUniformLocation(prog, "u_mouse");
    const uTime   = gl.getUniformLocation(prog, "u_time");
    const uSpeed  = gl.getUniformLocation(prog, "u_speed");
    const uClicks = gl.getUniformLocation(prog, "u_clicks[0]");

    /* state */
    const start   = performance.now();
    const mouse   = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lastMouse = { x: mouse.x, y: mouse.y, t: 0 };
    let   speed   = 0;
    const MAX_C   = 8;
    const clicks: Array<{ x: number; y: number; t: number }> = [];
    const clickData = new Float32Array(MAX_C * 4);
    let   raf: number;

    /* resize */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    /* mouse */
    const onMove = (e: MouseEvent) => {
      const now = performance.now() / 1000;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      const dt = now - lastMouse.t;
      if (dt > 0) {
        const px = Math.sqrt(dx * dx + dy * dy);
        speed = Math.min(px / (dt * 600), 1.0);
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      lastMouse.t = now;
    };

    /* clicks */
    const onClick = (e: MouseEvent) => {
      const t = (performance.now() - start) / 1000;
      if (clicks.length >= MAX_C) clicks.shift();
      clicks.push({ x: e.clientX, y: e.clientY, t });
    };

    /* touch support */
    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const now = performance.now() / 1000;
        const dx = touch.clientX - lastMouse.x;
        const dy = touch.clientY - lastMouse.y;
        const dt = now - lastMouse.t;
        if (dt > 0) speed = Math.min(Math.sqrt(dx*dx+dy*dy)/(dt*600), 1.0);
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        lastMouse.x = touch.clientX;
        lastMouse.y = touch.clientY;
        lastMouse.t = now;
      }
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

    /* render loop */
    const render = () => {
      const t = (performance.now() - start) / 1000;
      speed *= 0.92;

      /* build click uniform array */
      for (let i = 0; i < MAX_C; i++) {
        if (i < clicks.length) {
          clickData[i*4+0] = clicks[i].x;
          clickData[i*4+1] = clicks[i].y;
          clickData[i*4+2] = clicks[i].t;
          clickData[i*4+3] = 1.0;
        } else {
          clickData[i*4+3] = 0.0;
        }
      }

      gl.useProgram(prog);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x * (canvas.width  / window.innerWidth),
                           mouse.y * (canvas.height / window.innerHeight));
      gl.uniform1f(uTime,  t);
      gl.uniform1f(uSpeed, speed);
      gl.uniform4fv(uClicks, clickData);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("click",      onClick);
      window.removeEventListener("touchmove",  onTouch);
      window.removeEventListener("touchend",   onTouchTap);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
