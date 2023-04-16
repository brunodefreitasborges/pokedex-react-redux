import { useSelector } from "react-redux";
import { capitalize, getTypeIcon } from "../common/helperFunctions";
import { State } from "../store/reducers";

function PokeCard() {
  const { selectedPokemon, isLoadingCard, error } = useSelector(
    (state: State) => state
  );

  return (
    <>
      {selectedPokemon && !isLoadingCard && !error && (
        <div
          className={`w-[500px] max-h-[600px] shadow-black shadow-2xl rounded-br-[100px] rounded-tl-[100px] 
        flex flex-col gap-8 items-center mt-8 py-8 px-4
        bg-type-${selectedPokemon.types[0].type.name}`}
        >
          <div className="flex justify-around w-full">
            <div className="flex flex-col items-end justify-center gap-4">
              <div className="flex flex-wrap gap-2 max-w-[200px]">
                <h3>Name:</h3>
                <span data-testid="card-name" className="">
                  {capitalize(selectedPokemon.name)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <h3>Weight:</h3>
                <span data-testid="card-weight" className="">
                  {selectedPokemon.weight}kg
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <h3>Height:</h3>
                <span data-testid="card-height" className="">
                  {selectedPokemon.height * 10}cm
                </span>
              </div>
            </div>
            <div
              className={`w-[180px] h-[180px] rounded-3xl border-2 
                border-background bg-black bg-opacity-30`}
            >
              <img
                data-testid="card-sprite"
                className="relative z-10 w-full h-full"
                src={selectedPokemon.sprites.front_default || 'assets/image-placeholder.png'}
                alt="Miniature image of the pokemon"
              />
            </div>
          </div>
          <div className="w-[90%] h-[70%] flex flex-col items-end gap-8 rounded-br-[100px]">
            <div className="flex gap-4">
              {selectedPokemon.types.map((type, index) => (
                <div
                  data-testid="card-type"
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
            <div className="flex justify-between w-full">
              <div className="flex flex-col items-start w-2/5 h-full gap-4">
                <h3 className="text-lg">Abilities</h3>
                <ul className="flex flex-col gap-2">
                  {selectedPokemon.abilities.map((ability, index) => (
                    <li
                      data-testid="card-ability"
                      key={index}
                      className="text-xs"
                    >
                      {capitalize(ability.ability.name)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col w-3/5 gap-4">
                <h3 className="text-lg text-right">Stats</h3>
                <div className="flex flex-col items-end gap-2">
                  {selectedPokemon.stats.map((stat) => (
                    <div
                      data-testid="card-stat"
                      key={stat.stat.name}
                      className="flex gap-2 text-xs"
                    >
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
      {(!selectedPokemon || isLoadingCard || error) && (
        <div
          className="w-[500px] max-h-[600px] h-full flex justify-center items-center 
  mt-8 shadow-black shadow-2xl rounded-br-[100px] rounded-tl-[100px] bg-black"
        >
          {isLoadingCard ? (
            <h3 className="animate-bounce">Loading...</h3>
          ) : error ? (
            <h3 className="animate-bounce">Could not find the pokemon...</h3>
          ) : null}
        </div>
      )}
    </>
  );
}

export default PokeCard;
