import { useState, useRef, useEffect, useCallback } from "react";
import starWarsMusic from "../../assets/music/Star Wars - The Force Awakens (Suite for Orchestra. IV. The Jedi Steps & Finale).mp3";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export default function AudioPlayer({ autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Auto-play cuando se active la prop (solo una vez)
  useEffect(() => {
    if (autoPlay && audioRef.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Error al reproducir audio:", error);
        }
      };
      playAudio();
    }
  }, [autoPlay]);

  // Cerrar controles al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowControls(false);
      }
    };
    if (showControls) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showControls]);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const toggleControls = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(prev => !prev);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={containerRef}>
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src={starWarsMusic} type="audio/mpeg" />
      </audio>

      {/* Control Panel */}
      <div className="relative">
        {/* Expanded Controls */}
        {showControls && (
          <div className="absolute bottom-full right-0 mb-3 bg-black/90 backdrop-blur-xl border-2 border-yellow-400/50 rounded-2xl p-5 shadow-2xl shadow-yellow-400/30 min-w-[280px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-sm font-bold tracking-wider">
                  AUDIO
                </span>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Play/Pause inside controls */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={togglePlay}
                className="bg-yellow-400 hover:bg-yellow-300 text-black p-2 rounded-full transition-all duration-200 hover:scale-105"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div>
                <p className="text-white text-xs font-semibold">Star Wars</p>
                <p className="text-gray-400 text-xs">The Jedi Steps & Finale</p>
              </div>
              <div className={`ml-auto w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
            </div>

            {/* Volume Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-semibold">Volumen</span>
                <span className="text-yellow-400 text-xs font-bold">{Math.round(volume * 100)}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Main Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black p-4 rounded-full shadow-2xl shadow-yellow-400/50 transition-all duration-300 hover:scale-110 group"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-20"></div>
          )}
        </button>

        {/* Settings button to toggle controls */}
        <button
          onClick={toggleControls}
          className="absolute -top-1 -left-1 bg-black/80 border border-yellow-400/40 text-yellow-400 p-1.5 rounded-full transition-all duration-200 hover:scale-110 hover:border-yellow-400"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
          </svg>
        </button>

        {/* Status Indicator */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
        )}

        {/* Sound Wave Animation */}
        {isPlaying && (
          <div className="absolute -bottom-1 -left-1 flex items-end gap-0.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-yellow-400 rounded-full"
                style={{
                  height: "12px",
                  animation: `pulse 0.6s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
