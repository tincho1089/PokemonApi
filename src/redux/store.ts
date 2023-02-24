import { Pokemon, PokemonList } from '@/models/pokemon.model'
import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from './states/pokemon'
import pokemonListSlice from './states/pokemonList'

export interface AppStore {
  pokemon: Pokemon
  pokemonList: PokemonList[]
}

export default configureStore<AppStore>({
  reducer: {
    pokemon: pokemonSlice.reducer,
    pokemonList: pokemonListSlice.reducer,
  },
})
