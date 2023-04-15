import { Dispatch } from "react";
import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";
import PokemonService from "../services/PokemonService";
import { ActionType, SetPokemonListAction, SelectPokemonAction, SetLoadingListAction, SetLoadingCardAction, SetPageAction, PokemonAction } from "./actionTypes";

export const fetchPokemonList = (page?: string, next?: boolean): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoadingList(true));
    if (page === undefined) page = 'limit=100';
    switch (next) {
      case true: dispatch(setPage(true)); break;
      case false: dispatch(setPage(false)); break;
      default: dispatch(setPage(true)); break;
    }
    const pokemonData = await PokemonService.fetchAllPokemons(page);
    dispatch(setPokemonList(pokemonData));
    dispatch(setLoadingList(false));
  };
};

export const searchPokemon = (name: string): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoadingCard(true));
    try {
      const response = await PokemonService.getPokemonByName(name);
      dispatch(selectPokemon(response));
      dispatch(setLoadingCard(false));
      dispatch(setError(false));
    } catch (error) {
      dispatch(setLoadingCard(false));
      dispatch(setError(true));
    }
  };
};

export const setPokemonList = (pokemonList: PokemonPage): SetPokemonListAction => ({
  type: ActionType.SetPokemonList,
  payload: pokemonList,
});

export const fetchPokemon = (name: string): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoadingCard(true));
    const response = await PokemonService.getPokemonByName(name);
    dispatch(selectPokemon(response));
    dispatch(setLoadingCard(false));
    dispatch(setError(false));
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

export const setLoadingList = (isLoading: boolean): SetLoadingListAction => ({
  type: ActionType.SetLoadingList,
  payload: isLoading,
});

export const setLoadingCard = (isLoading: boolean): SetLoadingCardAction => ({
  type: ActionType.SetLoadingCard,
  payload: isLoading,
});

export const setError = (error: boolean): any => ({
  type: ActionType.SetError,
  payload: error,
});
