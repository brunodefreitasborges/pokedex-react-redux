import { Dispatch } from "react";
import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";
import PokemonService from "../services/PokemonService";

export enum ActionType {
  AddMyPokemon = "ADD_MY_POKEMON",
  RemoveMyPokemon = "REMOVE_MY_POKEMON",
  FetchPokemonList = "FETCH_POKEMON_LIST",
  SetPokemonList = "SET_POKEMON_LIST",
  FetchPokemon = "FETCH_POKEMON",
  SelectPokemon = "SELECT_POKEMON",
  SetLoading = "SET_LOADING",
  SetPage = "SET_PAGE",
}

interface FetchPokemonListAction {
  type: ActionType.FetchPokemonList;
}

interface SetPokemonListAction {
  type: ActionType.SetPokemonList;
  payload: PokemonPage;
}

interface SelectPokemonAction {
  type: ActionType.SelectPokemon;
  payload: Pokemon | null;
}

interface FetchPokemonAction {
  type: ActionType.FetchPokemon;
  payload: string;
}

interface SetLoadingAction {
  type: ActionType.SetLoading;
  payload: boolean;
}

interface SetPageAction {
  type: ActionType.SetPage;
  payload: boolean;
}

export type PokemonAction =
  | SetLoadingAction
  | FetchPokemonListAction
  | SetPokemonListAction
  | SelectPokemonAction
  | FetchPokemonAction
  | SetPageAction;

export const fetchPokemonList = (page?: string, next?: boolean): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoading(true)); 
    if(page === undefined) page = 'limit=100';
    if(next === undefined) dispatch(setPage(true));
    else if(next) dispatch(setPage(true)) 
    else if(!next) dispatch(setPage(false));
    const pokemonData =  await PokemonService.fetchAllPokemons(page);
    console.log('Next: ', pokemonData.next, 'Prev: ', pokemonData.previous)
    dispatch({ type: ActionType.SetPokemonList, payload: pokemonData });
    
    dispatch(setLoading(false)); 
  };
};

export const SetPokemonList = (pokemonList: PokemonPage): SetPokemonListAction => ({
  type: ActionType.SetPokemonList,
  payload: pokemonList,
});

export const fetchPokemon = (name: string): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoading(true));
    const response = await PokemonService.getPokemonByName(name);
    dispatch({ type: ActionType.SelectPokemon, payload: response });

    dispatch(setLoading(false)); 
  };
};

export const selectPokemon = (pokemon: Pokemon | null): SelectPokemonAction => ({
  type: ActionType.SelectPokemon,
  payload: pokemon,
});

export const setPage = (next: boolean): SetPageAction => ({
  type: ActionType.SetPage,
  payload: next,
});

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: ActionType.SetLoading,
  payload: isLoading,
});