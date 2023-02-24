import { Evolution, Pokemon } from '@/models'
import { persistLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export const evolution: Evolution[] = [
  {
    name: '',
    id: 0,
    isBaby: false,
    hasEvolved: false,
    evolvesTo: [],
  },
]

export const emptyPokemonState: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  species: {
    name: 'bulbasaur',
  },
  type: [
    {
      slot: 1,
      type: {
        name: 'grass',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: 'overgrow',
        is_hidden: false,
      },
      is_hidden: false,
    },
  ],
  stats: [
    {
      base_stat: 45,
    },
    {
      base_stat: 49,
    },
    {
      base_stat: 49,
    },
    {
      base_stat: 65,
    },
    {
      base_stat: 65,
    },
    {
      base_stat: 45,
    },
  ],
  sprites: {
    front_default: '',
    home_front: '',
    official_artwork: '',
  },
  category: 'Seed',
  height: 7,
  weight: 69,
  evolutionChain: {
    name: '',
    id: 0,
    isBaby: false,
    hasEvolved: false,
    evolvesTo: evolution,
  },
}

export const Key = 'pokemon'

export const pokemonSlice = createSlice({
  name: Key,
  initialState: localStorage.getItem(Key) ? JSON.parse(localStorage.getItem(Key) as string) : emptyPokemonState,
  reducers: {
    createPokemon: (state, action) => {
      persistLocalStorage<Pokemon>(Key, action.payload)
      return action.payload
    },
    updatePokemon: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<Pokemon>(Key, result)
      return result
    },
    resetPokemon: () => {
      persistLocalStorage<Pokemon>(Key, emptyPokemonState)
      // clearLocalStorage()
      return emptyPokemonState
    },
  },
})

export const { createPokemon, updatePokemon, resetPokemon } = pokemonSlice.actions

export default pokemonSlice
