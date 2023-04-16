import { Dispatch } from "react";
import { Pokemon } from "../models/Pokemon";
import { PokemonList } from "../models/PokemonList";
import PokemonService from "../services/PokemonService";
import { ActionType, SetPokemonListAction, SelectPokemonAction, SetLoadingListAction, SetLoadingCardAction, PokemonAction, SetFilteredPokemonListAction } from "./actionTypes";

export const fetchPokemonList = (): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    dispatch(setLoadingList(true));
    const pokemonData = await PokemonService.fetchAllPokemons();
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

export const setPokemonList = (pokemonList: PokemonList[]): SetPokemonListAction => ({
  type: ActionType.SetPokemonList,
  payload: pokemonList,
});

export const filterPokemonList = (pokemonList: PokemonList[], filter: string): any => {
  return async (dispatch: Dispatch<PokemonAction>): Promise<void> => {
    if(filter === '') {
      dispatch(setFilteredPokemonList([{name: 'No results', url: ''}]));
      return;
    };
    dispatch(setLoadingList(true));
    const pokemonData = pokemonList.filter((pokemon) => pokemon.name.toUpperCase().includes(filter));
    dispatch(setFilteredPokemonList(pokemonData));
    dispatch(setLoadingList(false));
  };
};

export const setFilteredPokemonList = (pokemonList: PokemonList[]): SetFilteredPokemonListAction => ({
  type: ActionType.SetFilteredPokemonList,
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
