import BoliviaWarsLogo from "../ui/BoliviaWarsLogo";
import LightSpeedEffect from "../ui/LightSpeedEffect";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Efecto Light Speed */}
      <LightSpeedEffect />

      <div className="mb-8 relative z-10">
        <BoliviaWarsLogo />
      </div>

      {/* Línea decorativa estilo Star Wars */}
      <div className="flex items-center gap-4 my-8 relative z-10">
        <div className="h-px w-20 bg-linear-to-r from-transparent to-yellow-400"></div>
        <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
        <div className="h-px w-20 bg-linear-to-l from-transparent to-yellow-400"></div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-12 animate-bounce relative z-10">
        <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
