export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  model?: string;
  cameraPosition?: [number, number, number];
  category: "character" | "environment" | "prop" | "wip";
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Rodrigo Paz Perreira - Luke Skywalker",
    description:
      "Modelo 3D completo del personaje Rodrigo Paz Perreira como Luke Skywalker",
    image: "/gallery/lukexd.png",
    model: "/models/Luke.glb",
    category: "character",
    cameraPosition: [0, 7, 50],
    date: "2026-05-20",
  },
  {
    id: "2",
    title: "Jaime Paz Zamorra - Darth Vader",
    description:
      "Modelo 3D completo del personaje Jaime Paz Zamorra como Darth Vader",
    image: "/gallery/darthvaderxd.png",
    model: "/models/darth1.glb",
    category: "character",
    cameraPosition: [0, 7, 50],
    date: "2026-05-22",
  },
  {
    id: "3",
    title: "Sable de Luz Azul",
    description: "Modelo detallado del sable de luz de Anakin",
    image: "/gallery/sable-azul.png",
    model: "/models/sable_marraqueta_AZUL.glb",
    category: "prop",
    cameraPosition: [0, 1, 10],
    date: "2026-05-18",
  },
  {
    id: "4",
    title: "Sable de Luz Rojo",
    description: "Modelo detallado del sable de luz de Darth Vader",
    image: "/gallery/sable-rojo.png",
    model: "/models/sable_marraqueta_ROJO.glb",
    category: "prop",
    cameraPosition: [0, 1, 10],
    date: "2026-05-18",
  },
  {
    id: "5",
    title: "Nave Minibus",
    description: "Nave espacial tipo minibus inspirada en el universo de Star Wars",
    image: "/gallery/nave.jpg",
    model: "/models/p2.glb",
    cameraPosition: [0, 1, 5],
    category: "prop",
    date: "2026-05-15",
  },
  {
    id: "6",
    title: "Escenario Espacial",
    description: "Ambiente espacial con estrellas y nebulosas",
    image: "/gallery/tatooine.png",
    model: "/models/mapa_m.glb",
    cameraPosition: [0, 7, 50],
    category: "environment",
    date: "2026-05-15",
  },
  {
    id: "7",
    title: "Desarrollo",
    description: "Proceso de modelado y texturizado",
    image: "/gallery/wip.png",
    images: ["/gallery/bocetos/bocetos.png",
              "/gallery/bocetos/boceto6.jpg",
              "/gallery/bocetos/boceto7.jpeg",
              "/gallery/bocetos/boceto8.jpeg",],
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
