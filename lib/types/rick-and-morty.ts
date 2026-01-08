export type CharacterGQL = {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
};

export type Character = {
  character_id: string;
  character_name: string;
  character_status: "Alive" | "Dead" | "unknown";
  character_species: string;
  character_type: string;
  character_gender: string;
  character_image: string;
  character_origin: string;
  character_location: string;
};

export type CharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: CharacterGQL[];
};

export type CharactersResponseFormatted = {
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: Character[];
};

export type FavoriteCharacter = {
  id: string;
  user_id: string;
  character_id: number;
  character_name: string;
  character_image: string | null;
  created_at: string;
};
