import { useState, useEffect, useRef, useCallback } from "react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevX?: number;
  prevY?: number;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(0.003); // velocidad inicial (lenta, como el LightSpeedEffect)
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  // Inicializar canvas y estrellas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crear 400 estrellas
    const numStars = 400;
    const stars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
      });
    }
    starsRef.current = stars;

    const animate = () => {
      const speed = speedRef.current;

      // Trail más largo cuando va rápido, más corto cuando va lento
      const trailAlpha = speed > 0.05 ? 0.03 : speed > 0.01 ? 0.08 : 0.15;
      ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        star.z -= speed * canvas.width;

        if (star.z <= 1) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
          star.prevX = undefined;
          star.prevY = undefined;
          return;
        }

        const k = 128 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (star.prevX !== undefined && star.prevY !== undefined) {
          const opacity = Math.max(0, Math.min(1, (1 - star.z / canvas.width) * 1.5));

          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(px, py);

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = Math.max(0.1, (1 - star.z / canvas.width) * (speed > 0.05 ? 3.5 : 2));
          ctx.stroke();

          // Glow en las estrellas cercanas cuando va rápido
          if (speed > 0.03 && star.z < canvas.width * 0.3) {
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Dibujar punto de la estrella
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const starSize = Math.max(0.1, (1 - star.z / canvas.width) * (speed > 0.05 ? 3 : 2));
          const starOpacity = Math.max(0, Math.min(1, (1 - star.z / canvas.width) * 1.5));

          ctx.beginPath();
          ctx.arc(px, py, starSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
          ctx.fill();
        }

        star.prevX = px;
        star.prevY = py;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleEnter = useCallback(() => {
    setIsAnimating(true);

    // Aceleración progresiva en varias fases (simula el "jump to hyperspace")
    const startTime = Date.now();

    const accelerate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < 500) {
        // Fase 1: Arranque lento (0-0.5s) — "preparando motores"
        speedRef.current = 0.003 + (elapsed / 500) * 0.01;
      } else if (elapsed < 1500) {
        // Fase 2: Aceleración fuerte (0.5-1.5s)
        const t = (elapsed - 500) / 1000;
        speedRef.current = 0.013 + t * t * 0.08;
      } else if (elapsed < 3500) {
        // Fase 3: Velocidad máxima (1.5-3.5s) — full hyperspace
        speedRef.current = 0.1 + Math.sin((elapsed - 1500) / 300) * 0.02;
      } else if (elapsed < 4200) {
        // Fase 4: Aún más rápido — "saliendo del hiperespacio"
        speedRef.current = 0.15;
      } else {
        // Terminó la aceleración
        return;
      }

      requestAnimationFrame(accelerate);
    };
    accelerate();

    // Flash blanco a los 4.2s
    setTimeout(() => {
      setShowFlash(true);
    }, 4200);

    // Transición completa a los 5s
    setTimeout(() => {
      onEnter();
    }, 5000);
  }, [onEnter]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity ${
        showFlash ? "duration-[800ms] opacity-0 pointer-events-none" : "duration-300 opacity-100"
      }`}
    >
      {/* Canvas de Light Speed */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "black" }}
      />

      {/* Flash blanco final */}
      <div
        className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity ${
          showFlash ? "opacity-100 duration-300" : "opacity-0 duration-100"
        }`}
      />

      {/* Contenido central */}
      <div
        className={`relative z-10 text-center space-y-8 px-4 transition-all ${
          isAnimating
            ? "scale-[2.5] opacity-0 duration-[2000ms]"
            : "scale-100 opacity-100 duration-500"
        }`}
      >
        {/* Logo */}
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse-slow">
            BOLIVIA
          </h1>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] -mt-4">
            WARS
          </h1>
        </div>

        {/* Subtítulo */}
        <p className="text-gray-400 text-lg md:text-xl tracking-wide">
          Una experiencia épica en 3D
        </p>

        {/* Botón de entrada */}
        <button
          onClick={handleEnter}
          disabled={isAnimating}
          className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-12 py-5 rounded-full text-xl hover:scale-110 transition-all duration-300 shadow-2xl shadow-yellow-400/50 hover:shadow-yellow-400/80 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-shimmer"></div>

          <span className="relative flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {isAnimating ? "INICIANDO..." : "ENTRAR"}
          </span>
        </button>

        {/* Indicador */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <svg
            className="w-4 h-4 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <span>Con audio épico</span>
        </div>

        {/* Decoración */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-px w-20 bg-linear-to-r from-transparent to-yellow-400"></div>
          <div className="w-2 h-2 bg-yellow-400 rotate-45 animate-pulse"></div>
          <div className="h-px w-20 bg-linear-to-l from-transparent to-yellow-400"></div>
        </div>

        {/* Texto adicional */}
        <p className="text-gray-600 text-xs italic mt-4">
          "Que la fuerza te acompañe"
        </p>
      </div>
    </div>
  );
}
