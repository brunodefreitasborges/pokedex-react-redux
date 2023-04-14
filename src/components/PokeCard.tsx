import { useDispatch, useSelector } from "react-redux";
import {
  capitalize,
  getBackgroundColor,
  getTypeIcon,
} from "../common/helperFunctions";
import { State } from "../store/reducers";

function PokeCard() {
  const dispatch = useDispatch();
  const { selectedPokemon, isLoading } = useSelector((state: State) => state);

  return (
    <>
      {selectedPokemon && !isLoading && (
        <div
          className={`w-[500px] max-h-[600px] shadow-black shadow-2xl rounded-br-[100px] rounded-tl-[100px] 
        flex flex-col gap-8 items-center py-8 px-4
        bg-type-${selectedPokemon.types[0].type.name}`}
        >
          <div className="flex w-full justify-around">
            <div className="flex flex-col justify-center items-end gap-4">
              <div className="flex flex-wrap gap-2 max-w-[200px]">
                <h3>Name:</h3>
                <span className="">{capitalize(selectedPokemon.name)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <h3>Weight:</h3>
                <span className="">{selectedPokemon.weight}kg</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <h3>Height:</h3>
                <span className="">{selectedPokemon.height * 10}cm</span>
              </div>
            </div>
            <div
              className={`w-[180px] h-[180px] rounded-3xl border-2 
                border-background bg-black bg-opacity-30`}
            >
              <img
                className="relative w-full h-full z-10"
                src={selectedPokemon.sprites.front_default}
                alt="Miniature image of the pokemon"
              />
            </div>
          </div>
          <div className="w-[90%] h-[70%] flex flex-col items-end gap-8 rounded-br-[100px]">
            <div className="flex gap-4">
              {selectedPokemon.types.map((type, index) => (
                <div
                  key={index}
                  className="w-fit h-[64px] bg-background flex items-center rounded-3xl gap-2 px-4"
                >
                  <h3 className="text-sm">{type.type.name.toUpperCase()}</h3>
                  <img
                    className="w-[32px]"
                    src={getTypeIcon(type.type.name)}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="flex w-full justify-between">
              <div className="flex w-2/5 flex-col items-start gap-4 h-full">
                <h3 className="text-lg">Abilities</h3>
                <ul className="flex flex-col gap-2">
                  {selectedPokemon.abilities.map((ability, index) => (
                    <li key={index} className="text-xs">
                      {capitalize(ability.ability.name)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-3/5 flex-col gap-4">
                <h3 className="text-right text-lg">Stats</h3>
                <div className="flex flex-col items-end gap-2">
                  {selectedPokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex gap-2 text-xs">
                      <h4>{stat.stat.name.toUpperCase()}:</h4>
                      <span>{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="w-[500px] max-h-[600px] h-full flex justify-center items-center shadow-black shadow-2xl rounded-br-[100px] rounded-tl-[100px] bg-black">
          <h3 className="animate-bounce">Loading...</h3>
        </div>
      )}
    </>
  );
}

export default PokeCard;
