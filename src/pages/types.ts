// types.ts

export interface Pokemon {
    id: string;
    name: string;
    classification: string;
    types: string[];
    weaknesses: string[];
    maxHP: number;
    image: string;
}

export interface PokemonListItem {
    id: string;
    name: string;
    image: string;
}
