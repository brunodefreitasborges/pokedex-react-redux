import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";

export enum ActionType {
  FetchPokemonList = "FETCH_POKEMON_LIST",
  SetPokemonList = "SET_POKEMON_LIST",
  SelectPokemon = "SELECT_POKEMON",
  SetLoadingList = "SET_LOADING_LIST",
  SetLoadingCard = "SET_LOADING_CARD",
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

export interface SetLoadingListAction {
  type: ActionType.SetLoadingList;
  payload: boolean;
}

export interface SetLoadingCardAction {
  type: ActionType.SetLoadingCard;
  payload: boolean;
}

export interface SetPageAction {
  type: ActionType.SetPage;
  payload: boolean;
}

export type PokemonAction =
  | SetLoadingListAction
  | SetLoadingCardAction
  | FetchPokemonListAction
  | SetPokemonListAction
  | SelectPokemonAction
  | SetPageAction;
