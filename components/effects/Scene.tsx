"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- particle universe ---------------- */
function ParticleField({ count = 1600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute in a soft sphere shell for depth
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.012;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

/* ---------------- neural-network wireframe core ---------------- */
function NeuralCore() {
  const a = useRef<THREE.LineSegments>(null);
  const b = useRef<THREE.LineSegments>(null);

  const geoA = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.4, 1)),
    []
  );
  const geoB = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.5, 0)),
    []
  );

  useFrame((state, delta) => {
    if (a.current) {
      a.current.rotation.y += delta * 0.16;
      a.current.rotation.x += delta * 0.08;
    }
    if (b.current) {
      b.current.rotation.y -= delta * 0.22;
      b.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group>
      <lineSegments ref={a} geometry={geoA}>
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.25} />
      </lineSegments>
      <lineSegments ref={b} geometry={geoB}>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

/* ---------------- parallax camera rig ---------------- */
function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 1.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Full-bleed fixed background canvas. Mounted via dynamic import with
 * ssr:false so three.js never touches the server bundle.
 */
export default function Scene() {
  return (
    <Canvas
      className="!fixed inset-0 -z-10"
      camera={{ position: [0, 0, 9], fov: 70 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <NeuralCore />
      <ParticleField />
      <Rig />
    </Canvas>
  );
}
