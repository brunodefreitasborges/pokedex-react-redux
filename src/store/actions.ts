import { Dispatch } from "react";
import { Pokemon } from "../models/Pokemon";
import { PokemonPage } from "../models/PokemonList";
import PokemonService from "../services/PokemonService";
import { ActionType, SetPokemonListAction, SelectPokemonAction, SetLoadingAction, SetPageAction, PokemonAction } from "./actionTypes";

export const fetchPokemonList = (page?: string, next?: boolean): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoading(true));
    if (page === undefined) page = 'limit=100';
    if (next === undefined) dispatch(setPage(true));
    else if (next) dispatch(setPage(true))
    else if (!next) dispatch(setPage(false));
    const pokemonData = await PokemonService.fetchAllPokemons(page);
    dispatch(setPokemonList(pokemonData));

    dispatch(setLoading(false));
  };
};

export const setPokemonList = (pokemonList: PokemonPage): SetPokemonListAction => ({
  type: ActionType.SetPokemonList,
  payload: pokemonList,
});

export const fetchPokemon = (name: string): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoading(true));
    const response = await PokemonService.getPokemonByName(name);
    dispatch(selectPokemon(response));

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
