import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";
import { ActionType, PokemonAction } from "./actions";

export interface State {
  favouritePokemons: string[];
  isLoading: boolean;
  pokemonPage?: PokemonPage;
  selectedPokemon: Pokemon | null;
  page: number;
}

const initialState: State = {
  favouritePokemons: [],
  isLoading: false,
  selectedPokemon: null,
  page: 0,
};

export const reducer = (state: State = initialState, action: PokemonAction): State => {
  switch (action.type) {
    case ActionType.SetPokemonList:
      return {
        ...state,
        pokemonPage: action.payload,
      };
    case ActionType.SelectPokemon:
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    case ActionType.SetPage:
      return {
        ...state,
        page: action.payload ? state.page + 1 : state.page - 1
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