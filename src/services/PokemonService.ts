import axios from "axios";
import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";

class PokemonService {
  static async getPokemonByName(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(url);
    const pokemon = response.data;
    return pokemon;
  }

  static async fetchAllPokemons(): Promise<PokemonList[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=1281`;
    const response = await axios.get(url);
    return response.data.results;
  }
}

export default PokemonService;