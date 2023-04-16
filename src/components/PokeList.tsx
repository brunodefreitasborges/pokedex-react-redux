import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchPokemon, fetchPokemonList } from "../store/actions";
import { State } from "../store/reducers";
import PokeCard from "./PokeCard";
import Modal from "./Modal";
import MobilePokeCard from "./MobilePokeCard";
import SearchInput from "./SearchInput";

function Pokelist() {
  const dispatch = useDispatch();
  const { selectedPokemon, pokemonList, filteredPokemonList, isLoadingList, error } = useSelector(
    (state: State) => state
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  useEffect(() => {
    dispatch(fetchPokemonList());
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (event: string) => {
    setInputValue(event);
  };

  return (
    <div className="flex justify-between w-full h-full">

        <div className="flex flex-col gap-4 max-lg:w-full">
         <SearchInput onChange={onChange}/>
          <div className="border-2 h-[calc(100%_-_90px)] lg:max-w-[350px] border-primary pb-4 pr-2 pt-2 rounded-lg ">
            {!isLoadingList && (
              <ul
                className="h-full max-w-full 
               overflow-y-scroll scrollbar py-4 lg:pl-4 lg:pr-8 flex flex-col gap-2"
              > 
              {
                filteredPokemonList.length > 0 && inputValue.length > 0 && (
                  filteredPokemonList?.map((pokeList) => (
                    <li
                      data-testid={`pokemon-${pokeList.name}`}
                      className=" px-2 py-2 mx-2 text-lg break-words lg:px-4 hover:cursor-pointer hover:bg-white hover:text-black"
                      onClick={() => {
                        dispatch(fetchPokemon(pokeList.name));
                        handleOpenModal();
                      }}
                      key={pokeList.name}
                    >
                      {pokeList.name.toUpperCase()}
                    </li>
                  )
                )
                )
              }
              {
                  inputValue.length === 0 && (
                  pokemonList?.map((pokeList) => (
                    <li
                      data-testid={`pokemon-${pokeList.name}`}
                      className=" px-2 py-2 mx-2 text-lg break-words lg:px-4 hover:cursor-pointer hover:bg-white hover:text-black"
                      onClick={() => {
                        dispatch(fetchPokemon(pokeList.name));
                        handleOpenModal();
                      }}
                      key={pokeList.name}
                    >
                      {pokeList.name.toUpperCase()}
                    </li>
                  )))
              }
              </ul>
            )}
            {isLoadingList && (
              <div className="h-full max-w-full 
              overflow-y-hidden">
                <Skeleton
                  height={36}
                  width={220}
                  baseColor="#2E382E"
                  highlightColor="#F9A826"
                  duration={0.8}
                  count={12}
                  className="skeleton-class"
                />
              </div>
            )}
          </div>
          <div>
              {
                filteredPokemonList.length === 0 && inputValue.length > 0 && (
                  <p className="text-center text-sm text-red-400">No pokemon found</p>
                ) 
              }
              {
                filteredPokemonList.length > 0 && inputValue.length > 0 && (
                  <p className="text-center text-sm text-gray-400">{filteredPokemonList.length} of {pokemonList?.length}</p>
                )
              }
              {
                filteredPokemonList.length === 0 && inputValue.length === 0 && (
                  <p className="text-center text-sm text-gray-400">{pokemonList?.length} of {pokemonList?.length}</p>
                )
              }
              {
                filteredPokemonList.length > 0 && filteredPokemonList[0].name === 'No results' && (
                  <p className="text-center text-sm text-gray-400">{pokemonList?.length} of {pokemonList?.length}</p>
                )
              }
          </div>
        </div>
      {selectedPokemon && !error && (
        <div className="justify-center hidden w-full h-full lg:flex">
          <PokeCard />
        </div>
      )}
       {error && (
        <div className="justify-center hidden w-full h-full lg:flex">
          <PokeCard />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full h-full">
          <MobilePokeCard />
        </div>
      </Modal>
    </div>
  );
}

export default Pokelist;
