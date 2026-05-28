import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
} from "@react-three/drei";

import { Suspense } from "react";

import { useState } from "react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "../../constants";
import type { GalleryItem } from "../../constants";
import ScrollReveal from "./ScrollReveal";
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  return (
    <Center>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 tracking-wide">
            Galería de Modelos 3D
          </h2>
          <p className="text-gray-400 text-lg">
            Explora nuestros modelos creados en Blender
          </p>
        </div>
      </ScrollReveal>

      {/* Category Filter */}
      <ScrollReveal delay={200}>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/50"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <ScrollReveal key={item.id} delay={100 * index} direction={index % 2 === 0 ? "up" : "scale"}>
            <div
              onClick={() => {
                setSelectedImage(item);
                setCurrentImageIndex(0);
              }}
              className="group relative bg-black/40 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden cursor-pointer hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/10"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-yellow-400 font-bold text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Ver Detalle
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                  {GALLERY_CATEGORIES.find((c) => c.id === item.category)?.label}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {item.description}
                </p>
                {item.date && (
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(item.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="max-w-4xl w-full bg-black/80 backdrop-blur-xl border border-yellow-400/30 rounded-lg overflow-hidden shadow-2xl shadow-yellow-400/10"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeIn 0.3s ease-out, slideUp 0.4s ease-out" }}
          >
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
              {selectedImage.model ? (
                <Canvas camera={{ position: selectedImage.cameraPosition , fov: 50 }}>
                  <ambientLight/>

                  <directionalLight
                    position={[5, 5, 5]}
                  />

                  <Suspense fallback={null}>
                    <Model url={selectedImage.model} />
                    <Environment preset="studio" />
                  </Suspense>

                  <OrbitControls autoRotate />
                </Canvas>
              ) : (
                selectedImage.images ? (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedImage.images[currentImageIndex]}
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                    />

                    {/* BOTON IZQUIERDA */}
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0
                            ? selectedImage.images!.length - 1
                            : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full"
                    >
                      ←
                    </button>

                    {/* BOTON DERECHA */}
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === selectedImage.images!.length - 1
                            ? 0
                            : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full"
                    >
                      →
                    </button>

                    {/* INDICADORES */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedImage.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            currentImageIndex === index
                              ? "bg-yellow-400"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                )
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {selectedImage.title}
                  </h3>
                  <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {
                      GALLERY_CATEGORIES.find(
                        (c) => c.id === selectedImage.category,
                      )?.label
                    }
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-white hover:text-yellow-400 transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-300 text-lg mb-4">
                {selectedImage.description}
              </p>
              {selectedImage.date && (
                <p className="text-gray-500 text-sm">
                  Creado el{" "}
                  {new Date(selectedImage.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
