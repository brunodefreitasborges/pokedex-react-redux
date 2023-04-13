import { Dispatch } from "react";
import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";
import PokemonService from "../services/PokemonService";

export enum ActionType {
  SetMyPokemonList = "SET_MY_POKEMON_LIST",
  AddMyPokemon = "ADD_MY_POKEMON",
  RemoveMyPokemon = "REMOVE_MY_POKEMON",
  FetchPokemonList = "FETCH_POKEMON_LIST",
  SetPokemonList = "SET_POKEMON_LIST",
  FetchPokemon = "FETCH_POKEMON",
  SelectPokemon = "SELECT_POKEMON",
  SetLoading = "SET_LOADING",
  NextPage = "NEXT_PAGE",
}

interface SetMyPokemonListAction {
  type: ActionType.SetMyPokemonList;
  payload: Pokemon[];
}

interface FetchPokemonListAction {
  type: ActionType.FetchPokemonList;
}

interface SetPokemonListAction {
  type: ActionType.SetPokemonList;
  payload: PokemonList[];
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

interface NextPageAction {
  type: ActionType.NextPage;
  payload: number;
}

export type PokemonAction =
  | SetMyPokemonListAction
  | SetLoadingAction
  | FetchPokemonListAction
  | SetPokemonListAction
  | SelectPokemonAction
  | FetchPokemonAction
  | NextPageAction;

  export const setMyPokemonList = (myPokemons: string[]): any => {
    return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
      dispatch(setLoading(true)); 

      const promises = myPokemons.map((name: string) => {
        return PokemonService.getPokemonByName(name)
      });
  
      const pokemonData = await Promise.all(promises);
      dispatch({ type: ActionType.SetMyPokemonList, payload: pokemonData });

      dispatch(setLoading(false)); 
    };
  };

export const fetchPokemonList = (): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoading(true)); 

    const promise = PokemonService.fetchAllPokemons();

    const pokemonData = await promise;
    dispatch({ type: ActionType.SetPokemonList, payload: pokemonData });

    dispatch(setLoading(false)); 
  };
};

export const SetPokemonList = (pokemonList: PokemonList[]): SetPokemonListAction => ({
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

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: ActionType.SetLoading,
  payload: isLoading,
});

export const nextPage = (page: number): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoading(true)); 

    const promise = PokemonService.fetchAllPokemons(page);

    const pokemonData = await promise;
    dispatch({ type: ActionType.SetPokemonList, payload: pokemonData });

    dispatch(setLoading(false)); 
  };
};