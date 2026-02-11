"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

/* ── Simplex 3D noise (Ashima/webgl-noise, MIT) ── */
const noiseGLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv=uv;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
}
`;

const fragmentShader = /* glsl */ `
${noiseGLSL}
uniform float uTime;
uniform vec2 uMouse;
uniform float uDark;

varying vec2 vUv;

void main(){
  vec2 uv=vUv;

  // Slow, layered noise for organic flow
  float t=uTime*0.08;
  float n1=snoise(vec3(uv*1.5,t))*0.5+0.5;
  float n2=snoise(vec3(uv*3.0+5.0,t*1.3))*0.5+0.5;
  float n3=snoise(vec3(uv*6.0+12.0,t*0.5))*0.5+0.5;
  float noise=n1*0.55+n2*0.3+n3*0.15;

  // Mouse glow — subtle warm spot near cursor
  vec2 mouseUV=uMouse*0.5+0.5;
  float mouseDist=distance(uv,mouseUV);
  float glowStr=mix(0.10,0.06,uDark);
  float mouseGlow=smoothstep(0.45,0.0,mouseDist)*glowStr;

  // Theme-aware luminance: dark mode = low range, light mode = high range
  float darkLow=0.025;
  float darkHigh=0.09;
  float lightLow=0.82;
  float lightHigh=0.97;
  float lumLow=mix(lightLow,darkLow,uDark);
  float lumHigh=mix(lightHigh,darkHigh,uDark);
  float lum=mix(lumLow,lumHigh,noise)+mouseGlow;

  // Slight warm tint near cursor
  vec3 color=vec3(lum);
  float warmth=smoothstep(0.4,0.0,mouseDist);
  color+=vec3(0.015,0.008,0.0)*warmth*uDark;
  color-=vec3(0.008,0.004,0.0)*warmth*(1.0-uDark);

  // Vignette
  float vig=smoothstep(1.5,0.4,length((uv-0.5)*vec2(1.2,1.0)));
  // In light mode, darken edges more noticeably
  float vigFinal=mix(1.0-((1.0-vig)*0.25),vig,uDark);
  color*=vigFinal;

  gl_FragColor=vec4(color,1.0);
}
`;

function NoisePlane() {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const isDarkRef = useRef(1.0);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDark: { value: 1.0 },
    }),
    [],
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);

    // Watch for theme changes
    const updateTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark")
        ? 1.0
        : 0.0;
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    // Smooth lerp toward cursor
    uniforms.uMouse.value.x +=
      (mouseRef.current.x - uniforms.uMouse.value.x) * 0.04;
    uniforms.uMouse.value.y +=
      (mouseRef.current.y - uniforms.uMouse.value.y) * 0.04;
    // Smooth theme transition
    uniforms.uDark.value +=
      (isDarkRef.current - uniforms.uDark.value) * 0.08;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 45 }}
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.25]}
      style={{ position: "absolute", inset: 0 }}
    >
      <NoisePlane />
    </Canvas>
  );
}
