import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UseRotationProps {
  speed?: number;
  axis?: 'x' | 'y' | 'z';
}

export function useRotation({ speed = 0.5, axis = 'z' }: UseRotationProps = {}) {
  const ref = useRef<THREE.Group | THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation[axis] += delta * speed;
    }
  });

  return ref;
}
