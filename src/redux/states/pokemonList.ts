import { PokemonList } from '@/models'
import { persistLocalStorage } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export const emptyPokemonState: PokemonList[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
]

export const Key = 'pokemonList'

export const pokemonListSlice = createSlice({
  name: Key,
  initialState: emptyPokemonState,
  reducers: {
    createPokemonList: (state, action) => {
      persistLocalStorage<PokemonList[]>(Key, [action.payload])
      return action.payload
    },
    updatePokemonList: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage<PokemonList[]>(Key, result)
      return result
    },
    resetPokemonList: () => {
      persistLocalStorage<PokemonList[]>(Key, emptyPokemonState)
      // clearLocalStorage()
      return emptyPokemonState
    },
  },
})

export const { createPokemonList, updatePokemonList, resetPokemonList } = pokemonListSlice.actions

export default pokemonListSlice
