import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";

export enum ActionType {
  FetchPokemonList = "FETCH_POKEMON_LIST",
  SetPokemonList = "SET_POKEMON_LIST",
  SelectPokemon = "SELECT_POKEMON",
  SetLoading = "SET_LOADING",
  SetPage = "SET_PAGE",
}

export interface FetchPokemonListAction {
  type: ActionType.FetchPokemonList;
}

export interface SetPokemonListAction {
  type: ActionType.SetPokemonList;
  payload: PokemonPage;
}

export interface SelectPokemonAction {
  type: ActionType.SelectPokemon;
  payload: Pokemon | null;
}

export interface SetLoadingAction {
  type: ActionType.SetLoading;
  payload: boolean;
}

export interface SetPageAction {
  type: ActionType.SetPage;
  payload: boolean;
}

export type PokemonAction =
  | SetLoadingAction
  | FetchPokemonListAction
  | SetPokemonListAction
  | SelectPokemonAction
  | SetPageAction;
