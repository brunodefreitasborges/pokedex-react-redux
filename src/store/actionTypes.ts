import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";

export enum ActionType {
  FetchPokemonList = "FETCH_POKEMON_LIST",
  SearchPokemon = "SEARCH_POKEMON",
  SetPokemonList = "SET_POKEMON_LIST",
  SetFilteredPokemonList = "SET_FILTERED_POKEMON_LIST",
  SelectPokemon = "SELECT_POKEMON",
  SetLoadingList = "SET_LOADING_LIST",
  SetLoadingCard = "SET_LOADING_CARD",
  SetError = "SET_ERROR",
}

export interface FetchPokemonListAction {
  type: ActionType.FetchPokemonList;
}

export interface SearchPokemonAction {
  type: ActionType.SearchPokemon;
  payload: string;
}

export interface SetPokemonListAction {
  type: ActionType.SetPokemonList;
  payload: PokemonList[];
}

export interface SetFilteredPokemonListAction {
  type: ActionType.SetFilteredPokemonList;
  payload: PokemonList[];
}

export interface SelectPokemonAction {
  type: ActionType.SelectPokemon;
  payload: Pokemon | null;
}

export interface SetLoadingListAction {
  type: ActionType.SetLoadingList;
  payload: boolean;
}

export interface SetLoadingCardAction {
  type: ActionType.SetLoadingCard;
  payload: boolean;
}

export interface SetErrorAction {
  type: ActionType.SetError;
  payload: boolean;
}

export type PokemonAction =
  | SetLoadingListAction
  | SetLoadingCardAction
  | FetchPokemonListAction
  | SetPokemonListAction
  | SetFilteredPokemonListAction
  | SelectPokemonAction
  | SearchPokemonAction
  | SetErrorAction;
