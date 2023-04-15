import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";
import { ActionType, PokemonAction } from "./actionTypes";

export interface State {
  isLoadingList: boolean;
  isLoadingCard: boolean;
  pokemonPage?: PokemonPage;
  selectedPokemon: Pokemon | null;
  page: number;
  error: boolean;
}

const initialState: State = {
  isLoadingList: false,
  isLoadingCard: false,
  selectedPokemon: null,
  page: 0,
  error: false,
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