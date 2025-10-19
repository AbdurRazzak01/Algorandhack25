import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function OrbShader() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.3;
    mesh.current.rotation.x += delta * 0.15;
  });

  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 5), []);
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    clearcoat: 1,
    roughness: 0.1,
    metalness: 0.2,
    transmission: 0.9,
    thickness: 1.0,
    reflectivity: 0.9,
    color: new THREE.Color("#9f88ff"),
    emissive: new THREE.Color("#7C4DFF"),
    emissiveIntensity: 0.08,
    sheen: 0.6,
  }), []);

  return <mesh ref={mesh} geometry={geo} material={mat} />;
}

export default function AgentCanvas() {
  return (
    <div className="w-full h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-panel">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 3, 5]} intensity={1.4} />
        <OrbShader />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
