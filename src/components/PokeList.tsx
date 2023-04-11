import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { State } from "../store/reducers";
import { fetchPokemonList, fetchPokemon } from "../store/actions";
import { Pokemon, PokemonList } from "../models/Pokemon";
import Card from "./Card";

function PokeList() {

  const dispatch = useDispatch();
  const isLoading = useSelector((state: State) => state.isLoading);
  const allPokemons = useSelector((state: State) => state.allPokemons);
  const selectedPokemon = useSelector((state: State) => state.selectedPokemon);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  async function fetchPokemonData(name: string) {
    dispatch(fetchPokemon(name));
  }

  return (
    <>
      {
          <div className="flex relative justify-between">
            <ul className="p-4">
              {allPokemons.map((pokemon: PokemonList) => (
              <li className="text-white px-4 font-visitor text-lg
              hover:cursor-pointer hover:bg-white hover:text-black"
              onClick={() => fetchPokemonData(pokemon.name)}
              >{pokemon.name}</li>
              ))}
            </ul>
            {
               selectedPokemon && !isLoading &&
               <div className="sticky top-12 right-12 h-fit">
                 <Card pokemon={selectedPokemon} />
               </div>
            }
            {
               selectedPokemon && isLoading &&
                <div className="sticky top-24 right-24 h-fit">
                  <p className="text-white font-visitor animate-bounce">Loading...</p>
                </div>
            },
             {
               !selectedPokemon && !isLoading &&
                <div className="sticky top-24 right-24 h-fit">
                  <p className="text-white font-visitor">Select a pokemon</p>
                </div>
            }
           
          </div>
       
   
      }
    </>
  );
};

export default PokeList;