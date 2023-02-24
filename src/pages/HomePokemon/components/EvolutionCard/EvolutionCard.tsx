import { Evolution } from '@/models'
import { updatePokemon } from '@/redux/states/pokemon'
import { useDispatch } from 'react-redux'
import { getFrontSprite } from '../../../../services/pokemon'
import styles from '../../styles/Evolution.module.css'
import { BsChevronRight } from 'react-icons/bs'
import { ColorWheel } from '@/components/ColorWheel'

const PokemonIcon = ({
  name,
  id,
  multi,
  borderColor,
  typeColor,
}: {
  name: string
  id: number
  multi: boolean
  borderColor: string
  typeColor: string
}) => {
  const borderStyle = { outline: `4px solid ${borderColor}` }
  const dispatch = useDispatch()

  return (
    <div
      className={`${styles.pokemon} ${multi && styles.multiPokemon}`}
      style={borderStyle}
      onClick={() => dispatch(updatePokemon({ id }))}
    >
      <div className={styles.image}>
        <ColorWheel color={typeColor} height={150} width={150} scale={0.3} radius={250} />
      </div>
      <img className={styles.image} src={getFrontSprite(id)} alt={name} height={130} width={130} />
      <label className={styles.imageName}>{name}</label>
    </div>
  )
}

const EvolutionLine = ({ chain, color, typeColor }: { chain: Evolution; color: string; typeColor: string }) => {
  return (
    <div className={styles.group}>
      {chain.hasEvolved && <BsChevronRight />}
      <PokemonIcon name={chain.name} id={chain.id} multi={chain.evolvesTo.length > 2} borderColor={color} typeColor={typeColor} />

      {chain.evolvesTo.length <= 2 && (
        <div className={styles.stage}>
          {chain.evolvesTo.map((next) => (
            <EvolutionLine key={next.id} chain={next} color={color} typeColor={typeColor} />
          ))}
        </div>
      )}

      {chain.evolvesTo.length > 2 && (
        <div className={styles.multiGroup}>
          <MultiEvolution color={color} chain={chain} typeColor={typeColor} />
        </div>
      )}
    </div>
  )
}

const MultiEvolution = ({ chain, color, typeColor }: { chain: Evolution; color: string; typeColor: string }) => {
  return (
    <>
      <BsChevronRight />

      <div className={styles.multiStage}>
        {chain.evolvesTo.map((next) => (
          <PokemonIcon key={next.id} name={next.name} id={next.id} multi={true} borderColor={color} typeColor={typeColor} />
        ))}
      </div>
    </>
  )
}

const EvolutionCard = ({ chain, color, typeColor }: { chain: Evolution | undefined; color: string; typeColor: string }) => {
  return (
    <>
      <div className={styles.header}>Evolution Chain</div>

      <div className={styles.card}>{chain && <EvolutionLine chain={chain} color={color} typeColor={typeColor} />}</div>
    </>
  )
}

export default EvolutionCard
