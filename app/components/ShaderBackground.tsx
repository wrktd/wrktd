"use client";
import { useEffect, useRef } from "react";

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
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v=0.0, a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.1+vec2(1.7,9.2); a*=0.5; }
  return v;
}

void main() {
  vec2 uv    = gl_FragCoord.xy / u_res;
  vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - u_mouse.y / u_res.y);
  float t    = u_time;

  /* ── Lava-lamp blobs ─────────────────────────────────────────────
     Slow speeds (0.05–0.11), large vertical swing, spread to center */
  float bx0 = 0.28 + 0.10*sin(t*0.09 + 0.0);
  float by0 = 0.50 + 0.40*sin(t*0.06 + 1.2);

  float bx1 = 0.68 + 0.11*sin(t*0.07 + 2.5);
  float by1 = 0.50 + 0.42*cos(t*0.05 + 0.8);

  float bx2 = 0.50 + 0.07*cos(t*0.11 + 1.0);
  float by2 = 0.38 + 0.30*sin(t*0.08 + 3.5);

  float bx3 = 0.18 + 0.11*cos(t*0.08 + 0.5);
  float by3 = 0.52 + 0.36*sin(t*0.07 + 2.0);

  float bx4 = 0.82 + 0.09*sin(t*0.09 + 1.8);
  float by4 = 0.48 + 0.34*cos(t*0.10 + 0.3);

  float bx5 = 0.48 + 0.14*sin(t*0.06 + 4.2);
  float by5 = 0.62 + 0.32*cos(t*0.08 + 1.5);

  float bx6 = 0.35 + 0.11*cos(t*0.10 + 3.0);
  float by6 = 0.28 + 0.30*sin(t*0.07 + 2.8);

  /* softness: 0.006 = tight focused blobs (was 0.025 = too spread) */
  float soft = 0.006;
  float str  = 0.022;

  float field = 0.0;
  vec2 dv; float d2;

  dv = uv - vec2(bx0, by0); d2=dot(dv,dv); field += 0.88*str/(d2+soft);
  dv = uv - vec2(bx1, by1); d2=dot(dv,dv); field += 0.90*str/(d2+soft);
  dv = uv - vec2(bx2, by2); d2=dot(dv,dv); field += 0.76*str/(d2+soft*0.8);
  dv = uv - vec2(bx3, by3); d2=dot(dv,dv); field += 0.73*str/(d2+soft*1.2);
  dv = uv - vec2(bx4, by4); d2=dot(dv,dv); field += 0.79*str/(d2+soft);
  dv = uv - vec2(bx5, by5); d2=dot(dv,dv); field += 0.66*str/(d2+soft*1.1);
  dv = uv - vec2(bx6, by6); d2=dot(dv,dv); field += 0.71*str/(d2+soft*0.9);

  /* ── Mouse influence ─────────────────────────────────────────── */
  dv = uv - mouse; d2 = dot(dv,dv);
  field += 0.048 / (d2 + 0.0035);
  field += u_speed * 0.07 / (d2 + 0.010);

  /* ── Organic surface distortion ─────────────────────────────── */
  float n1 = fbm(uv*3.5 + vec2(t*0.022, t*0.016));
  float n2 = fbm(uv*7.5 - vec2(t*0.014, t*0.028));
  field += n1 * 0.055;
  field += n2 * 0.018;

  /* ── Click ripples ──────────────────────────────────────────── */
  for(int i=0;i<8;i++){
    if(u_clicks[i].w > 0.5){
      float age = t - u_clicks[i].z;
      if(age >= 0.0 && age < 2.2){
        vec2 cp  = vec2(u_clicks[i].x/u_res.x, 1.0 - u_clicks[i].y/u_res.y);
        float d  = length(uv - cp);
        float fade = pow(max(0.0, 1.0 - age/2.2), 1.6);

        /* INSTANT large bloom — visible on frame 1 */
        float bloom = smoothstep(0.18, 0.0, d) * max(0.0, 1.0 - age*4.5) * 1.1;

        /* expanding rings */
        float r1 = age * 0.32;
        float ring1 = smoothstep(0.013, 0.0, abs(d - r1));
        float r2 = age * 0.19;
        float ring2 = smoothstep(0.008, 0.0, abs(d - r2)) * 0.45;

        field += (bloom + ring1 + ring2) * fade * 0.80;
      }
    }
  }

  field = clamp(field, 0.0, 1.0);

  /* ── Liquid chrome palette ─────────────────────────────────────
     dark void → dark silver → silver → light silver → specular     */
  float f = field;
  vec3 col;

  vec3 void_c  = vec3(0.018, 0.020, 0.032);   /* near-black blue void  */
  vec3 shad_c  = vec3(0.052, 0.058, 0.082);   /* dark shadow           */
  vec3 dksl_c  = vec3(0.150, 0.170, 0.230);   /* dark silver           */
  vec3 silv_c  = vec3(0.400, 0.440, 0.540);   /* medium silver         */
  vec3 ltsl_c  = vec3(0.680, 0.720, 0.800);   /* light silver          */
  vec3 higl_c  = vec3(0.870, 0.910, 0.970);   /* bright highlight      */
  vec3 spec_c  = vec3(0.970, 0.980, 1.000);   /* pure specular         */

  if      (f < 0.12) col = mix(void_c, shad_c, f/0.12);
  else if (f < 0.28) col = mix(shad_c, dksl_c, (f-0.12)/0.16);
  else if (f < 0.50) col = mix(dksl_c, silv_c, (f-0.28)/0.22);
  else if (f < 0.68) col = mix(silv_c, ltsl_c, (f-0.50)/0.18);
  else if (f < 0.84) col = mix(ltsl_c, higl_c, (f-0.68)/0.16);
  else               col = mix(higl_c, spec_c,  (f-0.84)/0.16);

  /* micro-surface liquid shimmer */
  float shimmer = fbm(uv*10.0 + t*0.08) * 0.05;
  col += vec3(shimmer*0.7, shimmer*0.9, shimmer*1.3) * smoothstep(0.25, 0.65, f);

  /* subtle iridescence in midtones */
  float iridMask = smoothstep(0.22, 0.55, f) * (1.0 - smoothstep(0.55, 0.82, f));
  float ia = fbm(uv*4.5 + t*0.008) * 6.28;
  col += vec3(cos(ia)*0.035, cos(ia+2.1)*0.025, cos(ia+4.2)*0.045) * iridMask;

  /* vignette */
  float vig = 1.0 - dot(uv-0.5, uv-0.5) * 0.80;
  col *= clamp(vig, 0.22, 1.0);

  /* scan-line shimmer — very subtle */
  float scan = sin(gl_FragCoord.y * 3.2 + t * 0.4) * 0.003;
  col += vec3(scan) * field * 0.4;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
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

    const aPos    = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes    = gl.getUniformLocation(prog, "u_res");
    const uMouse  = gl.getUniformLocation(prog, "u_mouse");
    const uTime   = gl.getUniformLocation(prog, "u_time");
    const uSpeed  = gl.getUniformLocation(prog, "u_speed");
    const uClicks = gl.getUniformLocation(prog, "u_clicks[0]");

    const start   = performance.now();
    const mouse   = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const lastMouse = { x: mouse.x, y: mouse.y, t: 0 };
    let   speed   = 0;
    const MAX_C   = 8;
    const clicks: Array<{ x: number; y: number; t: number }> = [];
    const clickData = new Float32Array(MAX_C * 4);
    let   raf: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now() / 1000;
      const dx = e.clientX - lastMouse.x, dy = e.clientY - lastMouse.y;
      const dt = now - lastMouse.t;
      if (dt > 0) speed = Math.min(Math.sqrt(dx*dx+dy*dy) / (dt*600), 1.0);
      mouse.x = e.clientX; mouse.y = e.clientY;
      lastMouse.x = e.clientX; lastMouse.y = e.clientY; lastMouse.t = now;
    };

    const onClick = (e: MouseEvent) => {
      /* store time in same units as shader (seconds from start) */
      const t = (performance.now() - start) / 1000;
      if (clicks.length >= MAX_C) clicks.shift();
      clicks.push({ x: e.clientX, y: e.clientY, t });
    };

    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const now = performance.now() / 1000;
        const dx = touch.clientX - lastMouse.x, dy = touch.clientY - lastMouse.y;
        const dt = now - lastMouse.t;
        if (dt > 0) speed = Math.min(Math.sqrt(dx*dx+dy*dy)/(dt*600), 1.0);
        mouse.x = touch.clientX; mouse.y = touch.clientY;
        lastMouse.x = touch.clientX; lastMouse.y = touch.clientY; lastMouse.t = now;
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

    const render = () => {
      const t = (performance.now() - start) / 1000;
      speed *= 0.90;

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
