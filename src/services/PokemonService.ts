import axios from "axios";
import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";

class PokemonService {
  static async getPokemonByName(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(url);
    const pokemon = response.data;
    return pokemon;
  }

  static async fetchAllPokemons(page: string): Promise<PokemonPage> {
    const url = `https://pokeapi.co/api/v2/pokemon/?${page}`;
    const response = await axios.get(url);
    return response.data;
  }
}

export default PokemonService;