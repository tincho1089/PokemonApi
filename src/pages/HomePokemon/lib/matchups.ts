import { dinamycPropObj, Type } from '@/models'
import { PokemonMatchUps, PokemonTypes } from '@/models/pokemon.model'
import { defaultTypesPokemon } from './types'

const getMatchups = (types: Type[]) => {
  const typeNames = types.map((type: Type) => type.type.name)
  const multipliers: PokemonMatchUps = {
    bug: 100,
    dark: 100,
    dragon: 100,
    electric: 100,
    fairy: 100,
    fighting: 100,
    fire: 100,
    flying: 100,
    ghost: 100,
    grass: 100,
    ground: 100,
    ice: 100,
    normal: 100,
    poison: 100,
    psychic: 100,
    rock: 100,
    steel: 100,
    water: 100,
  }
  typeNames.forEach((type: string) => {
    const damageRelations = defaultTypesPokemon[type as keyof PokemonTypes]

    const immuneFrom = damageRelations.defense.zero
    const resistantFrom = damageRelations.defense.half
    const weakFrom = damageRelations.defense.double

    immuneFrom.forEach((type: string) => {
      multipliers[type as keyof PokemonMatchUps] =
        multipliers[type as keyof PokemonMatchUps] != 100 ? multipliers[type as keyof PokemonMatchUps] * 0 : 0
    })

    resistantFrom.forEach((type) => {
      multipliers[type as keyof PokemonMatchUps] =
        multipliers[type as keyof PokemonMatchUps] != 100 ? multipliers[type as keyof PokemonMatchUps] * 0.5 : 0.5
    })

    weakFrom.forEach((type) => {
      multipliers[type as keyof PokemonMatchUps] =
        multipliers[type as keyof PokemonMatchUps] != 100 ? multipliers[type as keyof PokemonMatchUps] * 2 : 2
    })
  })

  const matchups: {
    immuneTo: dinamycPropObj[]
    resistantTo: dinamycPropObj[]
    weakTo: dinamycPropObj[]
  } = {
    immuneTo: [],
    resistantTo: [],
    weakTo: [],
  }

  Object.entries(multipliers).forEach((category) => {
    const [type, multipler] = category

    if (multipler !== 100) {
      if (multipler === 0) matchups.immuneTo.push({ [type]: multipler })
      else if (multipler < 1) matchups.resistantTo.push({ [type]: multipler })
      else if (multipler > 1) matchups.weakTo.push({ [type]: multipler })
    }
  })

  return matchups
}

export default getMatchups
