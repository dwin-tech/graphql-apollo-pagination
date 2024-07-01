// pages/pokemon/[name].tsx

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import client from '../apolloClient';
import { Pokemon } from '../types';
import { GET_POKEMON } from '../queries';
import styles from "@/styles/pokemon.module.css";


const PokemonPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const { loading, error, data } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON, {
    client,
    variables: { name: name as string },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { pokemon } = data!;

  return (
    <div className={styles.container}>
      <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Classification: {pokemon.classification}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
      <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
      <p>Max HP: {pokemon.maxHP}</p>
      </div>
    </div>
  );
};

export default PokemonPage;
