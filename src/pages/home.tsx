import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { PokemonListItem } from './types';
import { GET_POKEMONS } from './queries';


const HomePage = () => {
  const [firstCount, setFirstCount] = useState(10)
  const { loading, error, data } = useQuery<{ pokemons: PokemonListItem[] }>(GET_POKEMONS, {
    variables: {
      first: firstCount,
    },
    ssr: false,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const loadMore = async () => {
    setFirstCount(firstCount + 10)
  }

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {data?.pokemons?.map((pokemon: any) => (
          <div style={{
            marginTop: '20px'
          }} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.name}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              <li >
                <p>{pokemon.name}</p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default HomePage;
