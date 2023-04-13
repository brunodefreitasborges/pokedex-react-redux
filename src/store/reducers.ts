import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";
import { ActionType, PokemonAction } from "./actions";

export interface State {
  favouritePokemons: string[];
  pokemonList: Pokemon[];
  isLoading: boolean;
  allPokemons: PokemonList[];
  selectedPokemon: Pokemon | null;
  page: number;
}

const initialState: State = {
  favouritePokemons: [],
  pokemonList: [],
  allPokemons: [],
  isLoading: false,
  selectedPokemon: null,
  page: 1,
};

export const reducer = (state: State = initialState, action: PokemonAction): State => {
  switch (action.type) {
    case ActionType.SetMyPokemonList:
      return {
        ...state,
        pokemonList: action.payload,
        isLoading: false,
      };
    case ActionType.SetPokemonList:
      return {
        ...state,
        allPokemons: action.payload,
      };
    case ActionType.SelectPokemon:
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    case ActionType.SetLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};