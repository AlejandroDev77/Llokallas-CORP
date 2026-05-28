import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Character {
  id: string;
  name: string;
  alias: string;
  title: string;
  side: "light" | "dark";
  saberColor: string;
  glowColor: string;
  bio: string;
  realHistory: string;
  lore: string[];
  quote: string;
}

const CHARACTERS: Character[] = [
  {
    id: "jaime",
    name: "JAIME PAZ ZAMORA",
    alias: "Anakin Skywalker / Darth Vader",
    title: "El Elegido que cayó al Lado Oscuro",
    side: "dark",
    saberColor: "#FF0000",
    glowColor: "rgba(255, 0, 0, 0.3)",
    bio: "Nacido en Cochabamba en 1939, Jaime Paz Zamora comenzó como un idealista revolucionario — un verdadero Anakin Skywalker. Fundó el MIR en 1971 para luchar contra las dictaduras. Estudió en Bélgica, sobrevivió al exilio y la persecución. Pero el poder lo transformó.",
    realHistory:
      "Como Anakin, su ascenso fue meteórico: vicepresidente (1982-1984), luego presidente (1989-1993) mediante el 'Acuerdo Patriótico' — una alianza que muchos consideraron su caída al lado oscuro. Estabilizó la economía, firmó el Acuerdo de Ilo ('Boliviamar') con Perú, y promulgó leyes históricas. Pero las sombras del poder lo consumieron.",
    lore: [
      "Joven idealista → Señor Oscuro — Como Anakin, empezó luchando por la justicia y terminó abrazando el poder",
      "Fundador del MIR — Su Orden Jedi personal, creada para derrocar a los Sith... antes de convertirse en uno",
      "Sobrevivió al exilio — Forjado en el sufrimiento, como Anakin en Mustafar",
      "El Acuerdo Patriótico — Su momento de caída: la alianza oscura que le dio el trono imperial",
      "Sobrino de Víctor Paz Estenssoro — La Fuerza corre por sus venas, una dinastía de poder absoluto",
    ],
    quote:
      "\"Gobernar con ternura y respeto\" — Las últimas palabras de redención de Vader a su hijo Luke",
  },
  {
    id: "rodrigo",
    name: "RODRIGO PAZ PEREIRA",
    alias: "Luke Skywalker",
    title: "La Nueva Esperanza",
    side: "light",
    saberColor: "#00BFFF",
    glowColor: "rgba(0, 191, 255, 0.3)",
    bio: "Nacido en Santiago de Compostela, España, en 1967, durante el exilio de sus padres — como Luke, creció lejos de su padre, en un mundo distante. Hijo de Jaime Paz Zamora, cargó toda su vida con el peso del apellido y el legado de una dinastía.",
    realHistory:
      "Como Luke, forjó su propio camino: diputado (2002-2010), presidente del Concejo Municipal de Tarija (2010-2015), alcalde de Tarija (2015-2020) y senador (2020-2025). En 2025, fue electo presidente de Bolivia, completando la profecía — el hijo que supera al padre y trae un nuevo amanecer a la galaxia.",
    lore: [
      "Nacido en el exilio — Como Luke en Tatooine, creció lejos del centro del poder",
      "Hijo de Vader — Cargó con el peso del legado oscuro de su padre",
      "Entrenamiento en Tarija — Su Dagobah personal, donde se preparó para la batalla final",
      "Presidente 2025 — La nueva esperanza que la galaxia boliviana necesitaba",
      "\"Yo soy tu hijo\" — El momento en que confrontó el legado de su padre y decidió superarlo",
    ],
    quote:
      "\"Capitalismo para todos\" — La visión de Luke: un nuevo orden galáctico donde la Fuerza sea de todos",
  },
];

export default function CharacterLore() {
  const [activeCharacter, setActiveCharacter] = useState<string>("jaime");
  const character = CHARACTERS.find((c) => c.id === activeCharacter)!;

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Fondo de partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-yellow-400/50 text-xs tracking-[0.6em] uppercase mb-3">
              Hace mucho tiempo, en Bolivia...
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 mb-3 tracking-wide">
              LA DINASTÍA PAZ
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
              Padre e hijo. Dos presidentes. Un legado que atraviesa generaciones
              como la Fuerza misma.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60" />
              <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45" />
              <div className="w-2 h-2 bg-yellow-400 rotate-45" />
              <div className="w-1.5 h-1.5 bg-red-500 rotate-45" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500/60" />
            </div>
          </div>
        </ScrollReveal>

        {/* Selector de personaje */}
        <ScrollReveal delay={200}>
          <div className="flex justify-center gap-4 mb-12">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => setActiveCharacter(char.id)}
                className={`relative px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base tracking-wider transition-all duration-500 border ${
                  activeCharacter === char.id
                    ? char.side === "light"
                      ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-lg shadow-cyan-400/30"
                      : "bg-red-500/20 border-red-500/60 text-red-300 shadow-lg shadow-red-500/30"
                    : "bg-white/5 border-white/15 text-gray-400 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeCharacter === char.id ? "animate-pulse" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeCharacter === char.id
                          ? char.saberColor
                          : "#666",
                    }}
                  />
                  {char.name.split(" ")[0]}
                </span>
                {activeCharacter === char.id && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-1 rounded-full"
                    style={{
                      backgroundColor: char.saberColor,
                      boxShadow: `0 0 10px ${char.saberColor}`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Contenido del personaje */}
        <div
          key={character.id}
          className="space-y-8"
          style={{ animation: "fadeIn 0.5s ease-out" }}
        >
          {/* Card principal */}
          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            {/* Sable visual + Avatar */}
            <ScrollReveal direction={character.side === "light" ? "left" : "right"}>
              <div className="flex flex-col items-center">
                {/* Sable de luz */}
                <div className="relative w-full max-w-[120px] mb-6">
                  {/* Hoja */}
                  <div
                    className="w-3 mx-auto rounded-full"
                    style={{
                      height: "180px",
                      backgroundColor: character.saberColor,
                      boxShadow: `0 0 15px ${character.saberColor}, 0 0 30px ${character.saberColor}, 0 0 60px ${character.glowColor}`,
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                  {/* Núcleo */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 rounded-full"
                    style={{
                      height: "180px",
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                  />
                  {/* Guard */}
                  <div className="w-12 h-3 mx-auto bg-gray-500 rounded-sm mt-1" />
                  {/* Mango */}
                  <div className="w-6 h-16 mx-auto bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 rounded-md mt-0.5 relative">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: character.saberColor, boxShadow: `0 0 6px ${character.saberColor}` }}
                    />
                    <div className="absolute top-7 left-1 right-1 space-y-1">
                      <div className="h-px bg-gray-700" />
                      <div className="h-px bg-gray-700" />
                      <div className="h-px bg-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Nombre y alias */}
                <h3
                  className="text-2xl md:text-3xl font-black tracking-wider text-center mb-1"
                  style={{ color: character.saberColor }}
                >
                  {character.name}
                </h3>
                <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">
                  como
                </p>
                <p
                  className="text-lg font-bold tracking-wider"
                  style={{ color: character.saberColor }}
                >
                  {character.alias}
                </p>
                <p className="text-gray-400 text-sm italic mt-1">
                  "{character.title}"
                </p>
              </div>
            </ScrollReveal>

            {/* Historia */}
            <div className="space-y-6">
              {/* Bio real */}
              <ScrollReveal delay={100}>
                <div
                  className="backdrop-blur-md bg-black/40 border rounded-xl p-6"
                  style={{ borderColor: `${character.saberColor}33` }}
                >
                  <h4 className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: character.saberColor }}
                    />
                    Origen
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {character.bio}
                  </p>
                </div>
              </ScrollReveal>

              {/* Historia política */}
              <ScrollReveal delay={200}>
                <div
                  className="backdrop-blur-md bg-black/40 border rounded-xl p-6"
                  style={{ borderColor: `${character.saberColor}33` }}
                >
                  <h4 className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: character.saberColor }}
                    />
                    Historia
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {character.realHistory}
                  </p>
                </div>
              </ScrollReveal>

              {/* Lore Star Wars */}
              <ScrollReveal delay={300}>
                <div
                  className="backdrop-blur-md bg-black/40 border rounded-xl p-6"
                  style={{ borderColor: `${character.saberColor}33` }}
                >
                  <h4 className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: character.saberColor }}
                    />
                    Archivos de la Galaxia
                  </h4>
                  <div className="space-y-3">
                    {character.lore.map((item, i) => {
                      const [title, desc] = item.split(" — ");
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 group"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"
                            style={{
                              backgroundColor: character.saberColor,
                              boxShadow: `0 0 6px ${character.glowColor}`,
                            }}
                          />
                          <p className="text-gray-300 text-sm leading-relaxed">
                            <span
                              className="font-bold"
                              style={{ color: character.saberColor }}
                            >
                              {title}
                            </span>
                            {desc && (
                              <span className="text-gray-400"> — {desc}</span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Cita */}
          <ScrollReveal delay={400} direction="scale">
            <div className="text-center py-6">
              <div
                className="inline-block backdrop-blur-md bg-black/30 border rounded-2xl px-8 py-5 max-w-2xl"
                style={{
                  borderColor: `${character.saberColor}33`,
                  boxShadow: `0 0 30px ${character.glowColor}`,
                }}
              >
                <p
                  className="text-lg md:text-xl italic font-light leading-relaxed"
                  style={{ color: character.saberColor }}
                >
                  {character.quote}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Línea de conexión padre-hijo */}
        <ScrollReveal delay={500}>
          <div className="mt-16 text-center">
            <div className="inline-block backdrop-blur-md bg-black/40 border border-yellow-400/30 rounded-2xl px-8 py-6 max-w-2xl">
              <h4 className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4">
                El Legado
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Padre e hijo. Dos épocas. Dos presidencias. La dinastía Paz
                Zamora es la única en la historia de Bolivia donde padre e hijo
                han llegado a la presidencia de la república. Como Anakin y
                Luke, su historia es una de poder, caída, redención y el eterno
                dilema entre sucumbir a la oscuridad o traer una nueva esperanza.
              </p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "#00BFFF",
                      boxShadow: "0 0 8px rgba(0,191,255,0.5)",
                    }}
                  />
                  <span className="text-cyan-300 text-sm font-semibold">
                    1989–1993
                  </span>
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-cyan-400/60 to-red-500/60" />
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "#FF0000",
                      boxShadow: "0 0 8px rgba(255,0,0,0.5)",
                    }}
                  />
                  <span className="text-red-400 text-sm font-semibold">
                    2025–presente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
