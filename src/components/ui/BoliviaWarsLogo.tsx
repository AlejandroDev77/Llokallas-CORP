export default function BoliviaWarsLogo() {
  return (
    <div className="relative flex items-center justify-center min-h-[70vh] pt-20">
      {/* Logo principal */}
      <div className="relative">
        {/* Efecto de brillo solo en el borde del texto */}
        <div className="absolute inset-0 blur-xl opacity-40 scale-95">
          <h1 className="text-7xl md:text-9xl font-black text-center tracking-wider">
            <span className="block text-yellow-400">BOLIVIA</span>
            <span className="block text-white -mt-4">WARS</span>
          </h1>
        </div>

        <h1 className="relative text-7xl md:text-9xl font-black text-center tracking-wider perspective-1000">
          <span className="block text-transparent bg-clip-text bg-linear-to-b from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse-slow">
            BOLIVIA
          </span>
          <span className="block text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] -mt-4">
            WARS
          </span>
        </h1>
      </div>
    </div>
  );
}
