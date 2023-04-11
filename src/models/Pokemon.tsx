export interface PokemonList {
  name: string,
  url: string
}

export interface Pokemon {
  id: number,
  name: string
  sprites: Sprites
  types: Type[]
  weight: number
}
export interface Sprites {
  front_default: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Type2 {
  name: string
  url: string
}
