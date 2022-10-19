import { StigmaListProps, StigmaProps } from '../../Interfaces'
import styles from './StigmaList.module.css'
import StigmaItemWrapper from '../stigmaItem/StigmaItemWrapper'

const StigmaList = (props: StigmaListProps) => {
  const { currentLvl, stigmaList, stigmaAction } = props

  return (
    <div className={styles.stigmaListWrapper}>
      <div className={styles.stigmaList}>
        {stigmaList.map((stigma: StigmaProps) =>
          <StigmaItemWrapper
            stigma={stigma}
            currentLvl={currentLvl}
            key={stigma.id}
            stigmaAction={stigmaAction}
            stigmaPos='list'
          />
        )}
      </div>
    </div>
  )
}

export default StigmaList