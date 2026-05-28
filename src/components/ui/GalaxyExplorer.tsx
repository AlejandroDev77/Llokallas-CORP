import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface PlanetData {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  color: string;
  glowColor: string;
  bgGradient: string;
  size: string;
  icon: string;
  features: string[];
  atmosphere?: string;
}

const PLANETS: PlanetData[] = [
  {
    id: "tatooine",
    name: "TATOOINE",
    nameEs: "Planeta Desértico",
    description:
      "Un mundo desértico con dos soles, hogar de los Skywalker. Sus vastos desiertos ocultan civilizaciones enteras bajo la arena.",
    color: "#D2B48C",
    glowColor: "rgba(210, 180, 140, 0.4)",
    bgGradient: "from-amber-900/30 via-yellow-800/20 to-orange-900/30",
    size: "w-28 h-28 md:w-36 md:h-36",
    icon: "☀️",
    features: ["Dos soles", "Desierto", "Tusken Raiders"],
  },
  {
    id: "death-star",
    name: "ESTRELLA DE LA MUERTE",
    nameEs: "Estación de Batalla",
    description:
      "La estación de batalla más poderosa del Imperio. Capaz de destruir planetas enteros con su superlaser.",
    color: "#888888",
    glowColor: "rgba(0, 255, 0, 0.3)",
    bgGradient: "from-gray-800/40 via-gray-700/20 to-gray-900/40",
    size: "w-32 h-32 md:w-40 md:h-40",
    icon: "💀",
    features: ["Superlaser", "Trinchera", "Estación Imperial"],
  },
  {
    id: "naboo",
    name: "NABOO",
    nameEs: "Planeta Pacífico",
    description:
      "Un mundo de belleza sin igual, con vastas praderas, ciudades submarinas y la majestuosa capital de Theed.",
    color: "#228B22",
    glowColor: "rgba(34, 139, 34, 0.4)",
    bgGradient: "from-emerald-900/30 via-green-800/20 to-teal-900/30",
    size: "w-26 h-26 md:w-32 md:h-32",
    icon: "🌿",
    features: ["Praderas", "Ciudad submarina", "Theed"],
    atmosphere: "rgba(68, 136, 255, 0.15)",
  },
  {
    id: "mustafar",
    name: "MUSTAFAR",
    nameEs: "Planeta Volcánico",
    description:
      "Un infierno volcánico de lava y ceniza. Aquí se libró el duelo más épico entre Anakin y Obi-Wan Kenobi.",
    color: "#8B0000",
    glowColor: "rgba(255, 69, 0, 0.5)",
    bgGradient: "from-red-950/40 via-orange-900/20 to-red-900/40",
    size: "w-24 h-24 md:w-30 md:h-30",
    icon: "🌋",
    features: ["Lava", "Volcanes", "Duelo épico"],
  },
  {
    id: "alderaan",
    name: "ALDERAAN",
    nameEs: "Planeta Pacífico",
    description:
      "Un mundo paradisíaco de montañas y lagos cristalinos. Hogar de la Princesa Leia y bastión de paz en la galaxia.",
    color: "#4682B4",
    glowColor: "rgba(70, 130, 180, 0.4)",
    bgGradient: "from-blue-900/30 via-sky-800/20 to-indigo-900/30",
    size: "w-26 h-26 md:w-32 md:h-32",
    icon: "🌎",
    features: ["Montañas", "Lagos", "Princesa Leia"],
    atmosphere: "rgba(136, 187, 255, 0.15)",
  },
  {
    id: "hoth",
    name: "HOTH",
    nameEs: "Planeta de Hielo",
    description:
      "Un mundo congelado de tundras heladas. La Alianza Rebelde estableció aquí su base secreta Echo.",
    color: "#E0F0FF",
    glowColor: "rgba(176, 212, 241, 0.4)",
    bgGradient: "from-cyan-900/30 via-blue-800/20 to-slate-900/30",
    size: "w-24 h-24 md:w-28 md:h-28",
    icon: "❄️",
    features: ["Hielo", "Base Echo", "Wampas"],
    atmosphere: "rgba(204, 229, 255, 0.2)",
  },
  {
    id: "coruscant",
    name: "CORUSCANT",
    nameEs: "Planeta Capital",
    description:
      "El centro político de la galaxia. Un ecumenópolis cubierto de rascacielos kilométricos y luces infinitas.",
    color: "#DAA520",
    glowColor: "rgba(255, 215, 0, 0.4)",
    bgGradient: "from-yellow-900/30 via-amber-800/20 to-orange-900/30",
    size: "w-28 h-28 md:w-36 md:h-36",
    icon: "🏙️",
    features: ["Ecumenópolis", "Senado", "Templo Jedi"],
  },
];

export default function GalaxyExplorer() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Fondo de estrellas CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-yellow-400/60 text-sm tracking-[0.5em] uppercase mb-3">
              Hace mucho tiempo en una galaxia muy, muy lejana...
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 mb-4 tracking-wide">
              EXPLORAR GALAXIA
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubre los planetas icónicos del universo Bolivia Wars
            </p>
            {/* Línea decorativa */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-yellow-400/60" />
              <div className="w-2 h-2 bg-yellow-400 rotate-45" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-yellow-400/60" />
            </div>
          </div>
        </ScrollReveal>

        {/* Mapa galáctico - Grid de planetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {PLANETS.map((planet, index) => (
            <ScrollReveal
              key={planet.id}
              delay={index * 100}
              direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
            >
              <button
                onClick={() => setSelectedPlanet(planet)}
                className={`group relative w-full text-left bg-gradient-to-br ${planet.bgGradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-400/40 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl`}
                style={{
                  boxShadow: `0 0 30px ${planet.glowColor}`,
                }}
              >
                {/* Planeta visual */}
                <div className="flex items-center gap-5 mb-4">
                  {/* Esfera del planeta */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`${planet.size} rounded-full relative transition-transform duration-500 group-hover:scale-110`}
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${planet.color}dd, ${planet.color}88, ${planet.color}33)`,
                        boxShadow: `0 0 25px ${planet.glowColor}, inset -8px -8px 20px rgba(0,0,0,0.5), inset 4px 4px 10px rgba(255,255,255,0.1)`,
                      }}
                    >
                      {/* Highlight */}
                      <div
                        className="absolute top-[15%] left-[20%] w-[30%] h-[20%] rounded-full opacity-40"
                        style={{
                          background: `radial-gradient(ellipse, rgba(255,255,255,0.6), transparent)`,
                        }}
                      />
                      {/* Atmósfera */}
                      {planet.atmosphere && (
                        <div
                          className="absolute inset-[-4px] rounded-full"
                          style={{
                            background: `radial-gradient(circle, transparent 60%, ${planet.atmosphere})`,
                          }}
                        />
                      )}
                    </div>
                    {/* Orbita decorativa */}
                    <div
                      className="absolute inset-[-8px] rounded-full border border-dashed opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ borderColor: planet.color }}
                    />
                  </div>

                  {/* Nombre e info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black text-xl md:text-2xl tracking-wider group-hover:text-yellow-400 transition-colors duration-300">
                      {planet.name}
                    </h3>
                    <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">
                      {planet.nameEs}
                    </p>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {planet.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {planet.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2.5 py-1 rounded-full border font-semibold"
                      style={{
                        color: planet.color,
                        borderColor: `${planet.color}44`,
                        backgroundColor: `${planet.color}11`,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Flecha de explorar */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal de planeta seleccionado */}
      {selectedPlanet && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlanet(null)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div
            className="max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeIn 0.3s ease-out, slideUp 0.4s ease-out" }}
          >
            {/* Glow de fondo */}
            <div
              className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
              style={{ background: selectedPlanet.color }}
            />

            <div
              className={`relative bg-gradient-to-br ${selectedPlanet.bgGradient} backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl`}
              style={{ boxShadow: `0 0 60px ${selectedPlanet.glowColor}` }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Planeta grande */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-40 h-40 md:w-52 md:h-52 rounded-full relative mb-6"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}dd, ${selectedPlanet.color}88, ${selectedPlanet.color}22)`,
                    boxShadow: `0 0 50px ${selectedPlanet.glowColor}, 0 0 100px ${selectedPlanet.glowColor}, inset -12px -12px 30px rgba(0,0,0,0.6), inset 6px 6px 15px rgba(255,255,255,0.1)`,
                    animation: "pulse 4s ease-in-out infinite",
                  }}
                >
                  <div
                    className="absolute top-[12%] left-[18%] w-[35%] h-[22%] rounded-full opacity-30"
                    style={{ background: `radial-gradient(ellipse, rgba(255,255,255,0.7), transparent)` }}
                  />
                  {selectedPlanet.atmosphere && (
                    <div
                      className="absolute inset-[-6px] rounded-full"
                      style={{ background: `radial-gradient(circle, transparent 55%, ${selectedPlanet.atmosphere})` }}
                    />
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-yellow-400 tracking-wider mb-1">
                  {selectedPlanet.name}
                </h2>
                <p className="text-gray-500 text-sm tracking-widest uppercase">
                  {selectedPlanet.nameEs}
                </p>
              </div>

              {/* Descripción */}
              <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
                {selectedPlanet.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-3">
                {selectedPlanet.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-sm px-4 py-2 rounded-full border font-bold"
                    style={{
                      color: selectedPlanet.color,
                      borderColor: `${selectedPlanet.color}66`,
                      backgroundColor: `${selectedPlanet.color}15`,
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
