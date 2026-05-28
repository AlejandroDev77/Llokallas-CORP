import { Suspense, useState } from "react";
import { SpaceScene } from "../features/scene";
import {
  LoadingScreen,
  ProjectInfo,
  Gallery,
  TeamSection,
  AudioPlayer,
  WelcomeScreen,
  SectionDivider,
  CharacterLore,
} from "../components/ui";
import { HeroSection, Footer, Navbar } from "../components/layout";

export default function HomePage() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      {/* Pantalla de bienvenida */}
      {!hasEntered && <WelcomeScreen onEnter={() => setHasEntered(true)} />}

      <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Audio Player - se activa después de entrar */}
        <AudioPlayer autoPlay={hasEntered} />

        {/* Escena 3D de fondo */}
        <Suspense fallback={<LoadingScreen />}>
          <SpaceScene />
        </Suspense>

        {/* Contenido principal */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section id="hero">
            <HeroSection />
          </section>

          {/* Separador: Hero → Proyecto */}
          <SectionDivider variant="lightsaber" />

          {/* Info Section */}
          <section id="proyecto" className="relative z-10 py-20">
            <ProjectInfo />
          </section>

          {/* Separador: Proyecto → Historia */}
          <SectionDivider variant="diamond" />

          {/* Historia de Personajes */}
          <section id="historia" className="relative z-10">
            <CharacterLore />
          </section>

          {/* Separador: Historia → Galería */}
          <SectionDivider variant="lightsaber" />

          {/* Gallery Section */}
          <section id="galeria" className="relative z-10">
            <Gallery />
          </section>

          {/* Separador: Galería → Equipo */}
          <SectionDivider variant="wide" />

          {/* Team Section */}
          <section id="equipo" className="relative z-10">
            <TeamSection />
          </section>

          {/* Separador: Equipo → Footer */}
          <SectionDivider variant="default" />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}
