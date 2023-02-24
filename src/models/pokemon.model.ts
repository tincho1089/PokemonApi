export interface Pokemon {
  id: number
  name: string
  species: {
    name: string
  }
  category: string
  height: number
  weight: number
  abilities: Ability[]
  stats: Stat[]
  type: Type[]
  sprites: {
    front_default: string
    home_front: string
    official_artwork: string
  }
  evolutionChain?: {
    name: string
    id: number
    isBaby: boolean
    hasEvolved: boolean
    evolvesTo: Evolution[]
  }
}

export interface Evolution {
  name: string
  id: number
  isBaby: boolean
  hasEvolved: boolean
  evolvesTo: Evolution[]
}

export interface Ability {
  ability: {
    name: string
    is_hidden: boolean
  }
  is_hidden: boolean
}

export interface Stat {
  base_stat: number
}

export interface Type {
  slot: number
  type: {
    name: string
  }
}

export interface PokemonMatchUps {
  bug: number
  dark: number
  dragon: number
  electric: number
  fairy: number
  fighting: number
  fire: number
  flying: number
  ghost: number
  grass: number
  ground: number
  ice: number
  normal: number
  poison: number
  psychic: number
  rock: number
  steel: number
  water: number
}

export interface PokemonList {
  name: string
  url: string
}

export interface PokemonTypes {
  bug: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  dark: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  dragon: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  electric: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  fairy: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  fighting: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  fire: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  flying: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  ghost: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  grass: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  ground: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  ice: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  normal: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  poison: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  psychic: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  rock: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  steel: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
  water: {
    attack: {
      double: string[]
      half: string[]
      zero: string[]
    }
    defense: {
      half: string[]
      double: string[]
      zero: string[]
    }
  }
}

export interface PokemonTypesImages {
  bug: string
  dark: string
  dragon: string
  electric: string
  fairy: string
  fighting: string
  fire: string
  flying: string
  ghost: string
  grass: string
  ground: string
  ice: string
  normal: string
  poison: string
  psychic: string
  rock: string
  steel: string
  water: string
}
