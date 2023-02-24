import styles from '../../styles/Type.module.css'

const Type = ({ type, key }: { key: number; type: string }) => {
  return <button key={key} className={`${styles.type} ${styles[type]} ${styles.label} ${styles.tooltip}`} data-tip={type} />
}

export default Type
