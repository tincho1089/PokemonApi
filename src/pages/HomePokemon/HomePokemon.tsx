import { Loader, NavBar } from '@/components'
import { ColorWheel } from '@/components/ColorWheel'
import { PokemonTypesImages } from '@/models'
import { createPokemon } from '@/redux/states/pokemon'
import { AppStore } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonData } from '../../services/pokemon'
import { EvolutionCard, MatchupCard, StatsCard, Type } from './components'
import { pokemonTypeImages } from './lib'
import { getPalette } from './lib/colors'
import styles from './styles/Pokemon.module.css'

const Pokemon = () => {
  const dispatch = useDispatch()
  const pokemonState = useSelector((store: AppStore) => store.pokemon)
  const [dexNumber, setDexNumber] = useState(`#${String(pokemonState.id).padStart(3, '0')}`)
  const [abilities, setAbilities] = useState([{ name: 'overgrow', isHidden: false }])
  const [vibrantColor, setVibrantColor] = useState('#FFFFFF')
  const [pokemontTypeColor, setPokemonTypeColor] = useState('#FFFFFF')
  const [loading, setLoading] = useState(false)
  const getName = (name: string) => {
    const speciesName = name
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ')
    return speciesName
  }
  const [name, setName] = useState(getName(pokemonState.species.name))

  const tryGetPokemonData = async (id: number) => {
    try {
      setLoading(true)
      const data = await getPokemonData(id)
      dispatch(createPokemon(data))
      setName(getName(data.species.name))
      setDexNumber(`#${String(id).padStart(3, '0')}`)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    tryGetPokemonData(pokemonState.id)
  }, [pokemonState.id])

  const tryGetPalette = async (url: string) => {
    const bgColor = await getPalette(url)
    setVibrantColor(bgColor)
    document.body.style.backgroundColor = bgColor

    const typeColor = pokemonTypeImages[pokemonState.type[0].type.name as keyof PokemonTypesImages]
    setPokemonTypeColor(typeColor)
  }

  useEffect(() => {
    tryGetPalette(pokemonState.sprites.home_front)
  }, [pokemonState])

  useEffect(() => {
    setAbilities(
      pokemonState.abilities.map((ability) => ({
        name: ability.ability.name
          .split('-')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' '),
        isHidden: ability.is_hidden,
      })),
    )

    setName(getName(pokemonState.species.name))
  }, [pokemonState])

  return (
    <>
      <NavBar color={vibrantColor} />
      {loading && <Loader></Loader>}
      {!loading && (
        <>
          <main className={styles.main}>
            <div className={styles.row}>
              <section className={styles.meta}>
                <div className={styles.identifier}>
                  <div>
                    <div className={styles.dexId}>{dexNumber}</div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.category}>{pokemonState.category}</div>
                  </div>

                  <div className={styles.types}>
                    {pokemonState.type.map((type, idx) => (
                      <Type key={idx} type={type.type.name} />
                    ))}
                  </div>
                </div>

                <div className={styles.container}>
                  <div className={styles.card}>
                    <div>
                      <span className={styles.key}>Height</span> <div>{pokemonState.height / 10}m</div>
                    </div>
                    <div>
                      <span className={styles.key}>Weight</span> <div>{pokemonState.weight / 10}kg</div>
                    </div>
                    <div>
                      <span className={styles.key}>Abilities</span>{' '}
                      <div className={styles.abilities}>
                        {abilities.map((ability, idx) => (
                          <span className={styles.ability} key={idx}>
                            {ability.name} {ability.isHidden && <span className={styles.abilityHidden}>(Hidden)</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.art}>
                <div style={{ position: 'relative' }}>
                  <ColorWheel color={pokemontTypeColor} height={500} width={500} scale={1.2} radius={100} />
                  <img
                    className={styles.image}
                    alt={name}
                    src={pokemonState.sprites.official_artwork}
                    height='475'
                    width='475'
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                </div>
              </section>
            </div>
          </main>

          <main className={styles.main}>
            <EvolutionCard chain={pokemonState.evolutionChain} color={vibrantColor} typeColor={pokemontTypeColor} />
          </main>

          <main className={styles.main}>
            <div className={styles.row}>
              <StatsCard stats={pokemonState.stats} />
              <MatchupCard />
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default Pokemon
