import type { LightsaberProps } from '../../types';
import { useRotation, usePulseGlow } from '../../hooks';

export default function Lightsaber({ position, color, rotation = [0, 0, 0] }: LightsaberProps) {
  const groupRef = useRotation({ speed: 0.5, axis: 'z' });
  const glowRef = usePulseGlow({ baseIntensity: 0.8, amplitude: 0.3, speed: 0.003 });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Mango del sable */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Hoja de luz */}
      <mesh ref={glowRef} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Brillo exterior */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Luz puntual */}
      <pointLight position={[0, 0.2, 0]} color={color} intensity={2} distance={3} />
    </group>
  );
}
