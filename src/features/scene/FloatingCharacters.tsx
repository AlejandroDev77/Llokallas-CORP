import type { CharacterProps } from '../../types';
import { useFloatingAnimation } from '../../hooks';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import Lightsaber from './Lightsaber';

function Character({ position, name, color, saberColor }: CharacterProps) {
  const groupRef = useFloatingAnimation({
    baseY: position[1],
    amplitude: 0.3,
    rotationSpeed: 0.2,
    offset: position[0],
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Cuerpo del personaje - forma simple */}
      <mesh castShadow>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Cabeza */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Capa/Cape */}
      <mesh position={[0, 0, -0.2]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Sable de luz */}
      <Lightsaber position={[0.4, 0, 0]} color={saberColor} rotation={[0, 0, Math.PI / 4]} />

      {/* Nombre flotante usando Text */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

import { CHARACTERS } from '../../constants';

export default function FloatingCharacters() {
  return (
    <group>
      {CHARACTERS.map((character) => (
        <Character
          key={character.name}
          position={character.position}
          name={character.name}
          color={character.color}
          saberColor={character.saberColor}
        />
      ))}
    </group>
  );
}
