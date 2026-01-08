'use client';
import { useEffect, useMemo, useState } from 'react';
import CharacterCard from './character-card';
import Pagination from './pagination';
import { fetchFavoritesCharacters, FetchFavoritesResponsePaginated } from '@/lib/utils';

export default function Favorites() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<FetchFavoritesResponsePaginated | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const characters = await fetchFavoritesCharacters(page);
        setData(characters);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.ceil(data.total / data.per_page);
  }, [data]);

  if (loading || !data) {
    return <p className="text-center mt-20">Loading characters...</p>;
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rick & Morty Characters</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.data.map((character) => (
          <CharacterCard
            key={character.character_id}
            character={character}
            isFavorite={true}
            handleStarClick={() => {}}
          />
        ))}
      </div>

      <Pagination
        page={page}
        next={page < totalPages ? page + 1 : null} // disable next if on last page
        prev={page > 1 ? page - 1 : null} // disable prev if on first page
        onChange={setPage}
      />
    </main>
  );
}
