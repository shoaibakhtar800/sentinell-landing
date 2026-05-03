import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

const PARTICLE_COUNT = 25000;
const FAR_Z = -25;
const NEAR_Z = 8;

const generatePositions = () => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  random.inSphere(arr, { radius: 20 });
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3 + 2] = THREE.MathUtils.lerp(FAR_Z, NEAR_Z, Math.random());
  }
  return arr;
};

const generateSpeeds = () => {
  const arr = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i] = 0.8 + Math.random() * 1.6;
  }
  return arr;
};

const Stardust = () => {
  const ref = useRef<THREE.Points>(null);

  const [positions] = useState(generatePositions);
  const [speeds] = useState(generateSpeeds);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;

    const posAttr = points.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const d = Math.min(delta, 0.05);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const zi = i * 3 + 2;
      arr[zi] += d * speeds[i];
      if (arr[zi] > NEAR_Z) {
        arr[zi] = FAR_Z;
        arr[i * 3] = (Math.random() - 0.5) * 30;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      }
    }
    posAttr.needsUpdate = true;

    const tx = state.pointer.y * 0.15;
    const ty = state.pointer.x * 0.15;
    points.rotation.x += (tx - points.rotation.x) * 0.04;
    points.rotation.y += (ty - points.rotation.y) * 0.04;

    const mat = points.material as THREE.PointsMaterial;
    mat.opacity = 0.85 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
};

const generateFarPositions = (count: number) => {
  const arr = new Float32Array(count * 3);
  random.inSphere(arr, { radius: 35 });
  return arr;
};

const FarStardust = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 4000;

  const [positions] = useState(() => generateFarPositions(count));

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.x -= delta * 0.008;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a1a1aa"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 55%, hsl(var(--background) / 0.85) 100%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#000000", 6, 22]} />
        <Suspense fallback={null}>
          <FarStardust />
          <Stardust />
        </Suspense>
      </Canvas>
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-50"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 35%, hsl(var(--background) / 0.4) 65%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default Hero3D;
