interface SectionDividerProps {
  variant?: "default" | "wide" | "diamond" | "lightsaber";
}

export default function SectionDivider({ variant = "default" }: SectionDividerProps) {
  if (variant === "lightsaber") {
    return (
      <div className="relative py-12 flex items-center justify-center overflow-hidden">
        {/* Línea horizontal con glow */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
        
        {/* Sable izquierdo (azul) */}
        <div className="absolute left-[10%] right-[52%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent to-cyan-400 opacity-60 shadow-[0_0_15px_rgba(0,191,255,0.6)]" />
        
        {/* Sable derecho (rojo) */}
        <div className="absolute right-[10%] left-[52%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-l from-transparent to-red-500 opacity-60 shadow-[0_0_15px_rgba(255,0,0,0.6)]" />

        {/* Centro - choque de sables */}
        <div className="relative z-10 flex items-center gap-0">
          {/* Glow del choque */}
          <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
          
          {/* Diamante central */}
          <div className="w-4 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rotate-45 shadow-[0_0_20px_rgba(255,215,0,0.8)] animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div className="relative py-10 flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="w-1.5 h-1.5 bg-yellow-400/50 rotate-45" />
          <div className="w-2 h-2 bg-yellow-400/70 rotate-45" />
          <div className="w-3 h-3 bg-yellow-400 rotate-45 shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
          <div className="w-2 h-2 bg-yellow-400/70 rotate-45" />
          <div className="w-1.5 h-1.5 bg-yellow-400/50 rotate-45" />
        </div>
      </div>
    );
  }

  if (variant === "wide") {
    return (
      <div className="relative py-8">
        {/* Línea superior */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        
        {/* Área central con patrón */}
        <div className="flex items-center justify-center gap-2 py-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-px bg-yellow-400/30"
                style={{ width: `${30 - Math.abs(i - 2) * 8}px` }}
              />
              <div
                className="rounded-full bg-yellow-400"
                style={{
                  width: `${4 - Math.abs(i - 2)}px`,
                  height: `${4 - Math.abs(i - 2)}px`,
                  opacity: 1 - Math.abs(i - 2) * 0.25,
                }}
              />
            </div>
          ))}
        </div>

        {/* Línea inferior */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>
    );
  }

  // Default
  return (
    <div className="relative py-8 flex items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      <div className="relative flex items-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/60" />
        <div className="w-2 h-2 bg-yellow-400 rotate-45 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/60" />
      </div>
    </div>
  );
}
