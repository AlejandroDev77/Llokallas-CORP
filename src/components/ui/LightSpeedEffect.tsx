import { useEffect, useRef } from "react";

export default function LightSpeedEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crear estrellas para el efecto light speed
    interface Star {
      x: number;
      y: number;
      z: number;
      prevX?: number;
      prevY?: number;
    }

    const stars: Star[] = [];
    const numStars = 200;
    const speed = 0.003;
    let animId = 0;

    // Inicializar estrellas
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
      });
    }

    // Animación
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Mover estrella hacia adelante
        star.z -= speed * canvas.width;

        // Si la estrella sale de la pantalla, reiniciarla
        if (star.z <= 1) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
          star.prevX = undefined;
          star.prevY = undefined;
          return;
        }

        // Calcular posición en pantalla
        const k = 128 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        // Guardar posición anterior para dibujar línea
        if (star.prevX !== undefined && star.prevY !== undefined) {
          const opacity = Math.max(0, Math.min(1, 1 - star.z / canvas.width));

          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(px, py);

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = Math.max(0.1, (1 - star.z / canvas.width) * 2);
          ctx.stroke();
        }

        // Dibujar estrella al final de la línea
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const starSize = Math.max(0.1, (1 - star.z / canvas.width) * 2);
          const starOpacity = Math.max(0, Math.min(1, 1 - star.z / canvas.width));

          ctx.beginPath();
          ctx.arc(px, py, starSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
          ctx.fill();
        }

        star.prevX = px;
        star.prevY = py;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
