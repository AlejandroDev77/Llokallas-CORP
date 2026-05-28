import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
} from "@react-three/drei";

import { Suspense } from "react";

const galleryItems = [
  {
    id: "1",
    title: "Jaime Paz - Anakin",
    description:
      "Modelo 3D completo del personaje Jaime Paz como Anakin Skywalker",
    model: "/models/Luke Paz 31 .glb",
    category: "character",
    date: "2026-05-20",
  },
];

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  return (
    <Center>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black p-10">
      {galleryItems.map((item) => (
        <div
          key={item.id}
          className="w-full max-w-4xl mx-auto bg-zinc-900 rounded-2xl overflow-hidden"
        >
          <div className="h-[600px]">
            <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
              {/* luces */}
              <ambientLight intensity={2} />

              <directionalLight
                position={[5, 5, 5]}
                intensity={3}
              />

              <Suspense fallback={null}>
                <Model url={item.model} />
                <Environment preset="studio" />
              </Suspense>

              <OrbitControls autoRotate />
            </Canvas>
          </div>

          <div className="p-5 text-white">
            <h1 className="text-3xl font-bold">
              {item.title}
            </h1>

            <p className="text-zinc-400 mt-2">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}