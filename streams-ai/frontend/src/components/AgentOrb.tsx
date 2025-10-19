// src/components/AgentOrb.tsx

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import StaticOrb from "./StaticOrb";

export default function AgentOrb({ speaking = false }: { speaking?: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <StaticOrb />;

  return (
    <div className="w-40 h-40 md:w-48 md:h-48">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <AnimatedOrb speaking={speaking} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function AnimatedOrb({ speaking }: { speaking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * (speaking ? 0.08 : 0.02));
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color={"#7C4DFF"}
        emissive={"#62FFF6"}
        roughness={0.4}
        metalness={0.6}
        emissiveIntensity={speaking ? 1.2 : 0.6}
      />
    </mesh>
  );
}
