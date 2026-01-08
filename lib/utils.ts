import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CharacterGQL, CharactersResponse, Character, CharactersResponseFormatted } from './types/rick-and-morty';
import { createClient } from './supabase/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const formatCharacter = (character: CharacterGQL): Character => {
  return {
    character_id: character.id,
    character_name: character.name,
    character_status: character.status,
    character_species: character.species,
    character_type: character.type,
    character_gender: character.gender,
    character_image: character.image,
    character_origin: character.origin.name,
    character_location: character.location.name,
  };
};

export const fetchCharacters = async (page: number): Promise<CharactersResponseFormatted> => {
  const supabase = createClient();
  const { data } = await supabase.functions.invoke<CharactersResponse>(`get-page-of-characters?page=${page}`);
  return {
    info: data!.info,
    results: data!.results.map(formatCharacter),
  };
};

export type FetchFavoritesResponse = {
  data: Character[];
  total: number;
};

export type FetchFavoritesResponsePaginated = FetchFavoritesResponse & {
  data: Character[];
  page: number;
  per_page: number;
  total: number;
};
export const fetchFavoritesCharacters = async (page: number) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.functions.invoke<FetchFavoritesResponsePaginated>(
    `get-favorites?page=${page}`,
    {
      body: { page },
      // headers: { Authorization: `Bearer ${session.access_token}` },
    },
  );

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
export const isUserAuthenticated = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return false;
  }
  return true;
};

export const fetchAllFavoritesCharacters = async () => {
  const supabase = createClient();

  // if (!session) {
  //   throw new Error("User not authenticated");
  // }

  const { data, error } = await supabase.functions.invoke<FetchFavoritesResponse>(`get-all-favorites`);

  if (error) {
    console.error(error);
    // throw error;
  }

  return data;
};

// client-side call to edge function
export const addFavorite = async (character: Character) => {
  // Ensure user is signed in and we have an access token
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('Not authenticated');
  supabase.functions.setAuth(session?.access_token);

  const res = await supabase.functions.invoke('add-to-favorites', {
    method: 'POST',
    body: character,
  });

  return res.data;
};

export const deleteFavorite = async (characterId: string) => {
  // Ensure user is signed in and we have an access token
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('Not authenticated');
  supabase.functions.setAuth(session?.access_token);

  const res = await supabase.functions.invoke(`delete-favorite/${characterId}`, {
    method: 'DELETE',
  });

  return res.data;
};
