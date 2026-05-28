import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
  speed: number;
  name: string;
  hasRing?: boolean;
  ringColor?: string;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  hasTwinSuns?: boolean;
}

function Planet({
  position,
  size,
  color,
  emissiveColor,
  emissiveIntensity = 0.2,
  metalness = 0.4,
  roughness = 0.7,
  speed,
  name,
  hasRing,
  ringColor = "#FFD700",
  hasAtmosphere,
  atmosphereColor = "#4488ff",
  hasTwinSuns,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * speed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed * 0.5;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * speed * 0.3;
      atmosphereRef.current.rotation.x += delta * speed * 0.1;
    }
    // Slight floating bob
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(_state.clock.elapsedTime * 0.3 + position[0]) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Planeta */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={emissiveColor || color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Atmósfera (opcional) */}
      {hasAtmosphere && (
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[size * 1.12, 32, 32]} />
          <meshStandardMaterial
            color={atmosphereColor}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Anillo (opcional) */}
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshStandardMaterial
            color={ringColor}
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Twin suns for Tatooine */}
      {hasTwinSuns && (
        <>
          <mesh position={[size * 2.5, size * 1.2, -size * 0.5]}>
            <sphereGeometry args={[size * 0.25, 16, 16]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={2}
            />
          </mesh>
          <pointLight position={[size * 2.5, size * 1.2, -size * 0.5]} intensity={1} distance={size * 8} color="#FFD700" />
          <mesh position={[size * 3.2, size * 1.6, -size * 0.3]}>
            <sphereGeometry args={[size * 0.18, 16, 16]} />
            <meshStandardMaterial
              color="#FF8C00"
              emissive="#FF8C00"
              emissiveIntensity={2}
            />
          </mesh>
          <pointLight position={[size * 3.2, size * 1.6, -size * 0.3]} intensity={0.6} distance={size * 6} color="#FF8C00" />
        </>
      )}

      {/* Luz del planeta */}
      <pointLight
        position={[0, 0, 0]}
        intensity={emissiveIntensity * 1.5}
        distance={size * 6}
        color={emissiveColor || color}
      />

      {/* Nombre del planeta */}
      <Text
        position={[0, -size - 0.4, 0]}
        fontSize={0.25}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
        font={undefined}
      >
        {name}
      </Text>
    </group>
  );
}

// Death Star with superlaser dish
function DeathStarDish({ position, size }: { position: [number, number, number]; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(_state.clock.elapsedTime * 0.2 + 5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main sphere */}
      <mesh ref={ref}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color="#666666"
          metalness={0.9}
          roughness={0.3}
          emissive="#333333"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Superlaser dish indent */}
      <mesh position={[0, size * 0.35, size * 0.85]} rotation={[0.35, 0, 0]}>
        <sphereGeometry args={[size * 0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#444444"
          metalness={0.95}
          roughness={0.2}
          emissive="#222222"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Equatorial trench line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.001, 0.02, 8, 64]} />
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Green weapon glow */}
      <pointLight position={[0, size * 0.35, size * 1.2]} intensity={0.5} distance={size * 4} color="#00FF00" />

      {/* Name */}
      <Text
        position={[0, -size - 0.4, 0]}
        fontSize={0.22}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
        font={undefined}
      >
        ESTRELLA DE LA MUERTE
      </Text>
    </group>
  );
}

export default function FloatingPlanets() {
  return (
    <group>
      {/* Tatooine - Desierto con dos soles */}
      <Planet
        position={[-12, 5, -8]}
        size={1.2}
        color="#D2B48C"
        emissiveColor="#C19A6B"
        emissiveIntensity={0.15}
        roughness={0.9}
        metalness={0.1}
        speed={0.08}
        name="TATOOINE"
        hasTwinSuns
      />

      {/* Estrella de la Muerte */}
      <DeathStarDish
        position={[14, 7, -12]}
        size={1.5}
      />

      {/* Naboo - Verde y azul con atmósfera */}
      <Planet
        position={[-10, -6, -10]}
        size={1.1}
        color="#228B22"
        emissiveColor="#1a6b1a"
        emissiveIntensity={0.15}
        roughness={0.8}
        metalness={0.2}
        speed={0.1}
        name="NABOO"
        hasAtmosphere
        atmosphereColor="#4488ff"
      />

      {/* Mustafar - Planeta de lava */}
      <Planet
        position={[11, -5, -6]}
        size={1.0}
        color="#8B0000"
        emissiveColor="#FF4500"
        emissiveIntensity={0.8}
        roughness={0.6}
        metalness={0.5}
        speed={0.06}
        name="MUSTAFAR"
      />

      {/* Alderaan - Tipo Tierra con atmósfera */}
      <Planet
        position={[-15, 0, -14]}
        size={1.0}
        color="#4682B4"
        emissiveColor="#4169E1"
        emissiveIntensity={0.15}
        roughness={0.7}
        metalness={0.3}
        speed={0.12}
        name="ALDERAAN"
        hasAtmosphere
        atmosphereColor="#88bbff"
      />

      {/* Hoth - Planeta de hielo */}
      <Planet
        position={[16, 2, -10]}
        size={0.9}
        color="#E0F0FF"
        emissiveColor="#B0D4F1"
        emissiveIntensity={0.25}
        roughness={0.4}
        metalness={0.6}
        speed={0.09}
        name="HOTH"
        hasAtmosphere
        atmosphereColor="#CCE5FF"
      />

      {/* Coruscant - Planeta ciudad */}
      <Planet
        position={[5, -9, -8]}
        size={1.2}
        color="#DAA520"
        emissiveColor="#FFD700"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.8}
        speed={0.07}
        name="CORUSCANT"
        hasRing
        ringColor="#FFD700"
      />
    </group>
  );
}
