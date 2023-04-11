import axios from "axios";
import { Pokemon, PokemonList } from "../models/Pokemon";

class PokemonService {
  static async getPokemonByName(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(url);
    const pokemon: Pokemon = {
      id: response.data.id,
      name: response.data.name,
      sprites: response.data.sprites,
      types: response.data.types,
      weight: response.data.weight,
    };
    return pokemon;
  }

  static async fetchAllPokemons(): Promise<PokemonList[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=151`;
    const response = await axios.get(url);
    return response.data.results;
  }
}

export default PokemonService;