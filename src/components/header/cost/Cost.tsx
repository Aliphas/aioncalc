import { CostProps } from '../../../Interfaces'
import styles from './Cost.module.css'

const Cost = (props: CostProps) => {
  const { shards, ap } = props
  return <div className={styles.costWrapper}>
    <div className={styles.shardsContainer}>
      <div className={styles.cost}>
        <img src='https://raw.githubusercontent.com/Aliphas/aioncalc-images/main/global/cost.png' className={styles.shard} alt='shards' />
      </div>
      <div className={styles.costValue}>{shards}</div>
    </div>
    <div className={styles.apContainer}>
      <div className={styles.cost}>
        <img src='https://raw.githubusercontent.com/Aliphas/aioncalc-images/main/global/cost.png' className={styles.ap} alt='ap' />
      </div>
      <div className={styles.costValue}>{ap}</div>
    </div>

  </div>
}

export default Cost