import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffsetFromUrl } from "../common/helperFunctions";
import { fetchPokemon, fetchPokemonList } from "../store/actions";
import { State } from "../store/reducers";
import PokeCard from "./PokeCard";
import Modal from "./Modal";
import MobilePokeCard from "./MobilePokeCard";


function Pokelist() {

  const dispatch = useDispatch();
  const {selectedPokemon, pokemonPage, page} = useSelector((state: State) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function handlePokemonClick(name: string){
    dispatch(fetchPokemon(name));
    handleOpenModal();
  };
    
    return (
      <div className="flex w-full h-full justify-between">
        { 
           <div className="flex max-lg:w-full flex-col gap-4">
             <div className="border-2 h-[calc(100%_-_32px)] border-primary pb-4 pr-2 pt-2 rounded-lg ">
               <ul className="h-full max-w-full lg:max-w-[400px]
               overflow-y-scroll scrollbar py-4 lg:pl-4 lg:pr-12 flex flex-col gap-2">
                  {pokemonPage?.results.map((pokeList) => (
                    <li className="px-2 mx-2 break-words lg:px-4 py-2 text-lg
                    hover:cursor-pointer hover:bg-white hover:text-black"
                    onClick={() => {handlePokemonClick(pokeList.name)}}
                    key={pokeList.name}>{pokeList.name.toUpperCase()}</li>
                  ))}
                </ul>
             </div>
             <div className="flex justify-between px-4">
              {
                page > 1 && page < 11 &&
                <>
                  <p onClick={() => {dispatch(fetchPokemonList(getOffsetFromUrl(pokemonPage!.previous), false))}} className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Previous</p>  
                  <p onClick={() => {dispatch(fetchPokemonList(getOffsetFromUrl(pokemonPage!.next), true))}} className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Next</p>
                </>
              }
              {
                page == 1 &&
                <>
                  <p className="px-2 py-1 text-gray-500">Previous</p>  
                  <p onClick={() => {dispatch(fetchPokemonList(getOffsetFromUrl(pokemonPage!.next), true))}} className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Next</p>
                </>
              }
              {
                page == 11 &&
                <>
                  <p onClick={() => {dispatch(fetchPokemonList(getOffsetFromUrl(pokemonPage!.previous), false))}} className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black">Previous</p>  
                  <p className="px-2 py-1 text-gray-500">Next</p>
                </>
              }

             </div>
           </div>
        }
        {
          selectedPokemon &&
          <div className="hidden lg:flex w-full h-full justify-center">
            <PokeCard/>
          </div>
        }

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="w-full h-full">
            <MobilePokeCard />
          </div>
        </Modal>
      </div>
    )
  }
  
  export default Pokelist