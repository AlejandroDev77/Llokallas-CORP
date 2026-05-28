import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { SCENE_CONFIG } from "../../constants";
import StarField from "./StarField";
import FloatingCharacters from "./FloatingCharacters";

export default function SpaceScene() {
  const { camera, lights } = SCENE_CONFIG;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={camera.position} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={camera.autoRotateSpeed}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Luces */}
        <ambientLight intensity={lights.ambient.intensity} />
        <pointLight
          position={lights.point1.position}
          intensity={lights.point1.intensity}
          color={lights.point1.color}
        />
        <pointLight
          position={lights.point2.position}
          intensity={lights.point2.intensity}
          color={lights.point2.color}
        />

        {/* Estrellas */}
        <StarField />

        {/* Personajes flotantes */}
        <FloatingCharacters />
      </Canvas>
    </div>
  );
}

