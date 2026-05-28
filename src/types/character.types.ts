export interface CharacterData {
  name: string;
  role: string;
  description: string;
  color: string;
  saberColor: string;
  position: [number, number, number];
}

export interface CharacterProps {
  position: [number, number, number];
  name: string;
  color: string;
  saberColor: string;
}
