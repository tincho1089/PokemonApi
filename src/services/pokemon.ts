import { Pokemon, PokemonList } from '@/models'
import axios from 'axios'
import { GetApiUrl, GetSpritesApiUrl } from './getAPI'

export const getOfficialArtwork = (number: number) => `${GetSpritesApiUrl()}other/official-artwork/${number}.png`

export const getFrontSprite = (number: number) => `${GetSpritesApiUrl()}${number}.png`

export const getHomeSprite = (number: number) => `${GetSpritesApiUrl()}other/home/${number}.png`

const getPokemon = async (number: number): Promise<PokemonList> => {
  const { data } = await axios.get(`${GetApiUrl()}pokemon/${Number(number)}`)

  return data
}

export const getPokemonList = async (limit: number) => {
  const { data } = await axios.get(`${GetApiUrl()}pokemon?limit=${limit}`)
  return data
}

const getGenus = async (number: number) => {
  const { data } = await axios.get(`${GetApiUrl()}pokemon-species/${Number(number)}`)

  return data
}

const getEvolution = async (uri: string) => {
  const { data } = await axios.get(uri)

  const getName = (name: string): string =>
    name
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')

  const getId = (uri: string): number => {
    const uriArray = uri.split('/')
    const number = Number(uriArray[uriArray.length - 2])
    return number
  }

  const populateEvolutions = (chain) => {
    if (!chain.evolves_to) return
    else
      return {
        name: getName(chain.species.name),
        id: getId(chain.species.url),
        isBaby: false, // chain.is_baby,
        hasEvolved: true,

        evolvesTo: [...chain.evolves_to.map((evolution: any) => populateEvolutions(evolution))],
      }
  }

  const chain = {
    name: getName(data.chain.species.name),
    id: getId(data.chain.species.url),
    isBaby: false, // data.chain.is_baby,
    hasEvolved: false,

    evolvesTo: [...data.chain.evolves_to.map((evo) => populateEvolutions(evo))],
  }

  return chain
}

export const getPokemonData = async (id: number): Promise<Pokemon> => {
  const pokemonData = await getPokemon(id)
  const speciesData = await getGenus(id)
  const evolutionData = await getEvolution(speciesData.evolution_chain.url)

  const genus = speciesData.genera.filter((genera: { language: { name: string }; genus: any }) => {
    if (genera.language.name === 'en') return genera.genus
  })[0].genus

  const pokemon = {
    id: pokemonData.id,
    name: pokemonData.name,
    species: { name: pokemonData.species.name },
    category: genus,

    height: pokemonData.height,
    weight: pokemonData.weight,

    abilities: pokemonData.abilities,
    stats: pokemonData.stats,
    type: pokemonData.types,

    sprites: {
      front_default: getFrontSprite(id),
      home_front: getHomeSprite(id),
      official_artwork: getOfficialArtwork(id),
    },

    evolutionChain: evolutionData,
  }

  return pokemon
}
