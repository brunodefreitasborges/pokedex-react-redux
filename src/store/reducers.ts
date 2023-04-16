import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";
import { ActionType, PokemonAction } from "./actionTypes";

export interface State {
  isLoadingList: boolean;
  isLoadingCard: boolean;
  pokemonList?: PokemonList[];
  filteredPokemonList: PokemonList[];
  selectedPokemon: Pokemon | null;
  error: boolean;
}

const initialState: State = {
  isLoadingList: false,
  isLoadingCard: false,
  filteredPokemonList: [],
  selectedPokemon: null,
  error: false,
};

export const reducer = (state: State = initialState, action: PokemonAction): State => {
  switch (action.type) {
    case ActionType.SetPokemonList:
      return {
        ...state,
        pokemonList: action.payload,
      };
    case ActionType.SetFilteredPokemonList:
      return {
        ...state,
        filteredPokemonList: action.payload,
      };
    case ActionType.SelectPokemon:
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    case ActionType.SetLoadingList:
      return {
        ...state,
        isLoadingList: action.payload,
      };
    case ActionType.SetLoadingCard:
    return {
      ...state,
      isLoadingCard: action.payload,
    };
    case ActionType.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};