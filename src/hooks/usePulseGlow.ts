import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UsePulseGlowProps {
  baseIntensity?: number;
  amplitude?: number;
  speed?: number;
}

export function usePulseGlow({
  baseIntensity = 0.5,
  amplitude = 0.3,
  speed = 0.003,
}: UsePulseGlowProps = {}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = baseIntensity + Math.sin(Date.now() * speed) * amplitude;
      }
    }
  });

  return meshRef;
}
