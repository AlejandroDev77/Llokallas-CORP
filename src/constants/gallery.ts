export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "character" | "environment" | "prop" | "wip";
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Jaime Paz - Anakin",
    description:
      "Modelo 3D completo del personaje Jaime Paz como Anakin Skywalker",
    image: "/gallery/jaime-anakin.png",
    category: "character",
    date: "2026-05-20",
  },
  {
    id: "2",
    title: "Rodrigo Paz - Darth Vader",
    description:
      "Modelo 3D completo del personaje Rodrigo Paz como Darth Vader",
    image: "/gallery/rodrigo-vader.png",
    category: "character",
    date: "2026-05-22",
  },
  {
    id: "3",
    title: "Sable de Luz Azul",
    description: "Modelo detallado del sable de luz de Anakin",
    image: "/gallery/sable-azul.png",
    category: "prop",
    date: "2026-05-18",
  },
  {
    id: "4",
    title: "Sable de Luz Rojo",
    description: "Modelo detallado del sable de luz de Darth Vader",
    image: "/gallery/sable-rojo.png",
    category: "prop",
    date: "2026-05-18",
  },
  {
    id: "5",
    title: "Escenario Espacial",
    description: "Ambiente espacial con estrellas y nebulosas",
    image: "/gallery/espacio.png",
    category: "environment",
    date: "2026-05-15",
  },
  {
    id: "6",
    title: "Work in Progress",
    description: "Proceso de modelado y texturizado",
    image: "/gallery/wip.png",
    category: "wip",
    date: "2026-05-25",
  },
];

export const GALLERY_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "character", label: "Personajes" },
  { id: "prop", label: "Props" },
  { id: "environment", label: "Ambientes" },
  { id: "wip", label: "En Proceso" },
] as const;
