import { Pokemon } from "../models/Pokemon"

interface CardProps {
  pokemon: Pokemon;
}

const typeColors: {[key: string]: string} = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-500",
  psychic: "bg-pink-400",
  bug: "bg-green-700",
  rock: "bg-yellow-500",
  ghost: "bg-purple-700",
  dragon: "bg-purple-900",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-500"
}

function Card(props: CardProps) {

  const bgColor = typeColors[props.pokemon.types[0].type.name] || "bg-gray-400";
 
  return (
    <div onClick={() => {console.log(props.pokemon.name)}} 
    className={`rounded-lg flex flex-col items-center w-[120px] ${bgColor}`}
    style={{ backgroundColor: bgColor }}>
       <h3 className="font-visitor text-white">{props.pokemon.name}</h3>
       <img className="-mt-4" src={props.pokemon.sprites.front_default}></img>
       <span className="-mt-6 font-visitor text-white">{props.pokemon.types[0].type.name}</span>
       <span className=" font-visitor text-white">{props.pokemon.weight}kg</span>
    </div>
  )
}

export default Card