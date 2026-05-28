import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SCENE_CONFIG, COLORS } from '../../constants';
import * as THREE from 'three';

export default function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { stars } = SCENE_CONFIG;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(stars.count * 3);
    const colors = new Float32Array(stars.count * 3);

    for (let i = 0; i < stars.count; i++) {
      // Posiciones aleatorias en una esfera
      const radius = Math.random() * (stars.maxRadius - stars.minRadius) + stars.minRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Colores: blanco, amarillo
      const colorChoice = Math.random();
      if (colorChoice > (1 - stars.yellowRatio)) {
        // Amarillo
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 0.3;
      } else {
        // Blanco
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      }
    }

    return [positions, colors];
  }, [stars]);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}
