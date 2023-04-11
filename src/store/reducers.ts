import { Pokemon, PokemonList } from "../models/Pokemon";
import { ActionType, PokemonAction } from "./actions";

export interface State {
  myPokemons: string[];
  pokemonList: Pokemon[];
  isLoading: boolean;
  allPokemons: PokemonList[];
  selectedPokemon: Pokemon | null;
}

const initialState: State = {
  myPokemons: [
    "pikachu",
    "togepi",
    "bulbasaur",
    "charmander",
    "squirtle",
    "caterpie",
    "metapod",
    "butterfree",
    "pidgey",
    "pidgeotto",
    "pidgeot",
    "rattata",
    "raticate",
    "spearow",
    "fearow",
  ],
  pokemonList: [],
  allPokemons: [],
  isLoading: false,
  selectedPokemon: null,
};

export const reducer = (state: State = initialState, action: PokemonAction): State => {
  switch (action.type) {
    case ActionType.SetMyPokemonList:
      return {
        ...state,
        pokemonList: action.payload,
        isLoading: false,
      };
    case ActionType.AddMyPokemon:
      return {
        ...state,
        myPokemons: [...state.myPokemons, action.payload],
      };
    case ActionType.RemoveMyPokemon:
      return {
        ...state,
        myPokemons: state.myPokemons.filter((name) => name !== action.payload),
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