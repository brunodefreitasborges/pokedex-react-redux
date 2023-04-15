import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getOffsetFromUrl } from "../common/helperFunctions";
import { fetchPokemon, fetchPokemonList } from "../store/actions";
import { State } from "../store/reducers";
import PokeCard from "./PokeCard";
import Modal from "./Modal";
import MobilePokeCard from "./MobilePokeCard";

function Pokelist() {
  const dispatch = useDispatch();
  const { selectedPokemon, pokemonPage, page, isLoadingList } = useSelector(
    (state: State) => state
  );
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

  return (
    <div className="flex justify-between w-full h-full">
      {
        <div className="flex flex-col gap-4 max-lg:w-full">
          <div className="border-2 h-[calc(100%_-_32px)] lg:max-w-[350px] border-primary pb-4 pr-2 pt-2 rounded-lg ">
            {!isLoadingList && (
              <ul
                className="h-full max-w-full 
               overflow-y-scroll scrollbar py-4 lg:pl-4 lg:pr-8 flex flex-col gap-2"
              >
                {pokemonPage?.results.map((pokeList) => (
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
                ))}
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
          <div className="flex justify-between px-4">
            {page > 1 && page < 11 && (
              <>
                <p
                  data-testid="previous-button"
                  onClick={() => {
                    dispatch(
                      fetchPokemonList(
                        getOffsetFromUrl(pokemonPage!.previous),
                        false
                      )
                    );
                  }}
                  className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black"
                >
                  Previous
                </p>
                <p
                  data-testid="next-button"
                  onClick={() => {
                    dispatch(
                      fetchPokemonList(
                        getOffsetFromUrl(pokemonPage!.next),
                        true
                      )
                    );
                  }}
                  className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black"
                >
                  Next
                </p>
              </>
            )}
            {page == 1 && (
              <>
                <p
                  data-testid="previous-button"
                  className="px-2 py-1 text-gray-500"
                >
                  Previous
                </p>
                <p
                  data-testid="next-button"
                  onClick={() => {
                    dispatch(
                      fetchPokemonList(
                        getOffsetFromUrl(pokemonPage!.next),
                        true
                      )
                    );
                  }}
                  className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black"
                >
                  Next
                </p>
              </>
            )}
            {page == 11 && (
              <>
                <p
                  data-testid="previous-button"
                  onClick={() => {
                    dispatch(
                      fetchPokemonList(
                        getOffsetFromUrl(pokemonPage!.previous),
                        false
                      )
                    );
                  }}
                  className="px-2 py-1 hover:cursor-pointer hover:bg-white hover:text-black"
                >
                  Previous
                </p>
                <p
                  data-testid="next-button"
                  className="px-2 py-1 text-gray-500"
                >
                  Next
                </p>
              </>
            )}
          </div>
        </div>
      }
      {selectedPokemon && (
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
