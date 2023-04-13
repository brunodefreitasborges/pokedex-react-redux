export interface PokemonPage {
    count: number;
    next: string;
    previous: string;
    results: PokemonList[];
}

export interface PokemonList {
    name: string;
    url: string;
}