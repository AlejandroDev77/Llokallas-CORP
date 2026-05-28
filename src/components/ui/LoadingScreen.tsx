export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        <div className="relative">
          {/* Círculo giratorio dorado */}
          <div className="w-20 h-20 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
          
          {/* Estrella central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-400 rotate-45 animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-yellow-400 text-lg tracking-widest animate-pulse">
          CARGANDO...
        </p>
        
        <p className="text-gray-500 text-sm">
          Preparando el universo 3D
        </p>
      </div>
    </div>
  );
}
