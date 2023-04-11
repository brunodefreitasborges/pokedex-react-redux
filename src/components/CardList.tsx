import { Pokemon } from "../models/Pokemon";
import Card from "./Card";
import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { setMyPokemonList } from "../store/actions";
import { State } from "../store/reducers";

function CardList() {

  const dispatch = useDispatch();

  const myPokemons = useSelector((state: State) => state.myPokemons);
  const pokemonList = useSelector((state: State) => state.pokemonList);
  const isLoading = useSelector((state: State) => state.isLoading);
  
  useEffect(() => {
    dispatch(setMyPokemonList(myPokemons));
  }, [dispatch]);

  return (
    <>
      {isLoading && 
      <div className="flex justify-center items-center h-full">
        <p className="text-white font-visitor animate-bounce">Loading...</p>
      </div>
      
      }
      {!isLoading && (
        <div className="flex flex-wrap gap-6 border-4 border-[#263238] rounded-md">
          {pokemonList.map((pokemon: Pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        
      )}
    </>
  );
};

export default CardList;