// queries.ts

import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      classification
      types
      weaknesses
      maxHP
      image
    }
  }
`;

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
    }
  }
`;