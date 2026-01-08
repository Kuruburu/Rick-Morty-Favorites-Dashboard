'use client';
import { useEffect, useState } from 'react';
import CharacterCard from './character-card';
import Pagination from './pagination';
import {
  addFavorite,
  deleteFavorite,
  fetchAllFavoritesCharacters,
  fetchCharacters,
  isUserAuthenticated,
} from '@/lib/utils';
import { CharactersResponseFormatted } from '@/lib/types/rick-and-morty';

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CharactersResponseFormatted | null>(null);
  const [loading, setLoading] = useState(false);
  const [localFavoritesCharacters, setLocalFavoritesCharacters] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const characters = await fetchCharacters(page);
        const favoritesCharacters = await fetchAllFavoritesCharacters();
        const isAuthenticated = await isUserAuthenticated();
        setIsAuthenticated(isAuthenticated);
        setLocalFavoritesCharacters(favoritesCharacters?.data.map((char) => String(char.character_id)) || []);
        setData(characters);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page]);

  if (loading || !data) {
    return <p className="text-center mt-20">Loading characters...</p>;
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rick & Morty Characters</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.results.map((character) => (
          <CharacterCard
            key={character.character_id}
            character={character}
            isFavorite={localFavoritesCharacters.includes(character.character_id)}
            handleStarClick={async () => {
              if (!isAuthenticated) return;
              setLocalFavoritesCharacters((prev) => {
                const isFav = prev.includes(character.character_id);
                if (isFav) {
                  deleteFavorite(character.character_id).then();
                  return prev.filter((id) => id !== character.character_id);
                } else {
                  addFavorite(character);
                  return [...prev, character.character_id];
                }
              });
            }}
          />
        ))}
      </div>

      <Pagination page={page} next={data.info.next} prev={data.info.prev} onChange={setPage} />
    </main>
  );
}
