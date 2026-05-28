import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-yellow-400/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-yellow-400 rotate-45 transition-transform group-hover:rotate-90 duration-300"></div>
            <span className="text-white font-bold text-xl tracking-wider">
              BOLIVIA <span className="text-yellow-400">WARS</span>
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm tracking-widest uppercase font-semibold"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("proyecto")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm tracking-widest uppercase font-semibold"
            >
              Proyecto
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm tracking-widest uppercase font-semibold"
            >
              Galería
            </button>
            <button
              onClick={() => scrollToSection("equipo")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm tracking-widest uppercase font-semibold"
            >
              Equipo
            </button>
            <button
              onClick={() => scrollToSection("historia")}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm tracking-widest uppercase font-semibold"
            >
              Historia
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("historia")}
            className="hidden md:block bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/30"
          >
            ⚔️ La Dinastía Paz
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-yellow-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative line */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
      )}
    </nav>
  );
}
