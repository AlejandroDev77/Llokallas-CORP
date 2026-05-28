import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UseFloatingAnimationProps {
  baseY: number;
  amplitude?: number;
  rotationSpeed?: number;
  offset?: number;
}

export function useFloatingAnimation({
  baseY,
  amplitude = 0.3,
  rotationSpeed = 0.2,
  offset = 0,
}: UseFloatingAnimationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;
      groupRef.current.position.y = baseY + Math.sin(timeRef.current + offset) * amplitude;
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return groupRef;
}
