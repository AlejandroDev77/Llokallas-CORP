import { CHARACTERS, PROJECT_INFO } from "../../constants";
import ScrollReveal from "./ScrollReveal";

export default function ProjectInfo() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Descripción del proyecto */}
      <ScrollReveal>
        <div className="backdrop-blur-md bg-black/40 border border-yellow-400/30 rounded-lg p-8 shadow-2xl shadow-yellow-400/20">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 tracking-wide">
            El Proyecto
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {PROJECT_INFO.description}
          </p>
        </div>
      </ScrollReveal>

      {/* Los personajes */}
      <div id="personajes" className="grid md:grid-cols-2 gap-6">
        {CHARACTERS.map((character, index) => (
          <ScrollReveal key={character.name} delay={index * 200} direction={index === 0 ? "left" : "right"}>
            <div
              className="backdrop-blur-md bg-black/40 border border-white/30 rounded-lg p-6 shadow-xl hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-3 h-3 ${
                    index === 0 ? "bg-yellow-400" : "bg-red-500"
                  } rounded-full animate-pulse`}
                ></div>
                <h3 className="text-2xl font-bold text-white">
                  {character.name}
                </h3>
              </div>
              <p
                className={`${index === 0 ? "text-yellow-400" : "text-red-400"} font-semibold mb-2`}
              >
                como {character.role}
              </p>
              <p className="text-gray-400">{character.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Call to action */}
      <ScrollReveal direction="scale" delay={300}>
        <div className="text-center space-y-6">
          <p className="text-gray-400 text-lg italic">"{PROJECT_INFO.quote}"</p>
          <button className="bg-linear-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-full text-lg hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-400/50 hover:shadow-yellow-400/80">
            Explorar el Museo 3D
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
