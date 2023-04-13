import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon, fetchPokemonList } from "../store/actions";
import { State } from "../store/reducers";
import PokeCard from "./PokeCard";


function Pokelist() {

  const dispatch = useDispatch();
  const {selectedPokemon, allPokemons, isLoading, page} = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);
    
    return (
      <div className="flex w-full h-full justify-between">
        {
           <div className="flex flex-col gap-4">
             <div className="border-2 h-[calc(100%_-_32px)] border-primary pb-4 pr-2 pt-2 rounded-lg ">
               <ul className="h-full min-w-[80vw] md:min-w-[30px] max-w-[400px]
               overflow-y-scroll scrollbar py-4 md:pl-4 md:pr-12 flex flex-col gap-2">
                  {allPokemons.map((pokeList) => (
                    <li className="px-2 md:px-4 max-w-[50vw] md:w-fit py-2 text-lg
                    hover:cursor-pointer hover:bg-white hover:text-black"
                    onClick={() => {dispatch(fetchPokemon(pokeList.name))}}
                    key={pokeList.name}>{pokeList.name.toUpperCase()}</li>
                  ))}
                </ul>
             </div>
             <div className="flex justify-between px-4">
              {
                page > 1 && page < 10 &&
                <>
                  <p onClick={() => {dispatch(fetchNextPage())}} className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Previous</p>  
                  <p className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Next</p>
                </>
              }
              {
                page == 1 &&
                <>
                  <p className="px-2 py-1 text-gray-500">Previous</p>  
                  <p className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Next</p>
                </>
              }
              {
                page == 10 &&
                <>
                  <p className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Previous</p>  
                  <p className="px-2 py-1 text-gray-500">Next</p>
                </>
              }


             
             </div>
          
           </div>
        }
        {
          selectedPokemon &&
          <div className="flex w-full h-full justify-center">
            <PokeCard/>
          </div>
        }
      </div>
    )
  }
  
  export default Pokelist