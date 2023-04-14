import { useDispatch, useSelector } from "react-redux";
import {
  capitalize,
  getTypeIcon,
} from "../common/helperFunctions";
import { State } from "../store/reducers";

function MobilePokeCard() {
  const { selectedPokemon, isLoading } = useSelector((state: State) => state);

  return (
    <>
      {selectedPokemon && !isLoading && (
        <div
          className={`w-full h-full rounded-[20px] 
        flex flex-col gap-2 items-end py-2 px-2
        bg-type-${selectedPokemon.types[0].type.name}`}
        >
          <div className="flex justify-around w-full">
            <div className="flex flex-col items-end justify-center gap-2">
              <div className="flex flex-wrap gap-2 text-xs">
                <h3>Name:</h3>
                <span data-testid="card-name">{capitalize(selectedPokemon.name)}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <h3>Weight:</h3>
                <span data-testid="card-weight" className="">{selectedPokemon.weight}kg</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <h3>Height:</h3>
                <span data-testid="card-height" className="">{selectedPokemon.height * 10}cm</span>
              </div>
            </div>
            <div
              className="w-[100px] h-[100px] rounded-3xl border-2 
                border-background bg-black bg-opacity-30"
            >
              <img
                data-testid="card-sprite"
                className="relative z-10 w-full h-full"
                src={selectedPokemon.sprites.front_default}
                alt="Miniature image of the pokemon"
              />
            </div>
          </div>
          <div className="flex gap-4 px-8">
            {selectedPokemon.types.map((type, index) => (
              <div data-testid="card-type"
                key={index}
                className="w-fit h-[32px] bg-background flex items-center rounded-3xl gap-2 px-2"
              >
                <h3 className="text-[8px]">{type.type.name.toUpperCase()}</h3>
                <img
                  className="w-[24px]"
                  src={getTypeIcon(type.type.name)}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="w-full flex flex-row justify-around rounded-br-[100px]">
            <div className="flex flex-col items-start h-full gap-4">
              <h3 className="text-xs">Abilities</h3>
              <ul className="flex flex-col gap-2">
                {selectedPokemon.abilities.map((ability, index) => (
                  <li data-testid="card-ability" key={index} className="text-[8px]">
                    {capitalize(ability.ability.name)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-xs text-right">Stats</h3>
                <div className="flex flex-col items-end gap-2">
                  {selectedPokemon.stats.map((stat) => (
                    <div data-testid="card-stat" key={stat.stat.name} className="flex gap-2 text-[8px]">
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
        <div className="w-full h-full rounded-[20px] flex justify-center items-center bg-black">
          <h3 className="animate-bounce">Loading...</h3>
        </div>
      )}
    </>
  );
}

export default MobilePokeCard;
