export const COLORS = {
  primary: {
    gold: '#FFD700',
    goldLight: '#FFC700',
    goldDark: '#FFB700',
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },
  },
  saber: {
    blue: '#00BFFF',
    red: '#FF0000',
  },
} as const;

export const SCENE_CONFIG = {
  stars: {
    count: 5000,
    minRadius: 50,
    maxRadius: 100,
    yellowRatio: 0.3,
  },
  camera: {
    position: [0, 0, 15] as [number, number, number],
    autoRotateSpeed: 0.3,
  },
  lights: {
    ambient: {
      intensity: 0.3,
    },
    point1: {
      position: [10, 10, 10] as [number, number, number],
      intensity: 1,
      color: COLORS.primary.gold,
    },
    point2: {
      position: [-10, -10, -10] as [number, number, number],
      intensity: 0.5,
      color: COLORS.neutral.white,
    },
  },
} as const;
