export interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dylan Alejandro Poma Mamani",
    role: "Modelador 3D & Desarrollador",
    description:
      "Especialista en modelado de personajes, texturas y desarrollo web con React.",
  },
  {
    name: "Gisselle Andre Severich Aramayo",
    role: "Diseñadora 3D",
    description:
      "Experta en diseño de personajes, iluminación y composición de escenas.",
  },
  {
    name: "Danil Alvaro Pacheco Calle",
    role: "Animador 3D",
    description:
      "Especialista en rigging, animación de personajes y efectos visuales.",
  },
];
