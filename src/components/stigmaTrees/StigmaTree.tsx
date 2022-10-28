import { useRecoilValue } from 'recoil'
import { Tree } from '../../Interfaces'
import { currentLvlState } from '../../store'
import { Arrow1, Arrow2, Arrow3, Arrow5 } from '../arrows/Arrows'
import StigmaItemWrapper from '../stigmaItem/StigmaItemWrapper'
import styles from './StigmaTrees.module.css'

const StigmaTree = ({ normal, advanced }: Tree) => {
  const currentLvl: number = useRecoilValue(currentLvlState)

  return <div className={styles.tree}>
    <div className={styles.column}>
      <div className={styles.n1}>
        <StigmaItemWrapper
          stigma={normal[0]}
          currentLvl={currentLvl}
          key={normal[0].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
      <div className={styles.n2}>
        <StigmaItemWrapper
          stigma={normal[1]}
          currentLvl={currentLvl}
          key={normal[1].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
      <div className={styles.n3}>
        <StigmaItemWrapper
          stigma={normal[2]}
          currentLvl={currentLvl}
          key={normal[2].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
    </div>
    
    <div className={styles.column}>
      <div className={styles.a0}>
        <StigmaItemWrapper
          stigma={advanced[0]}
          currentLvl={currentLvl}
          key={advanced[0].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
      <div className={styles.a1}>
        <StigmaItemWrapper
          stigma={advanced[1]}
          currentLvl={currentLvl}
          key={advanced[1].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
      <div className={styles.n1}>
        <StigmaItemWrapper
          stigma={normal[3]}
          currentLvl={currentLvl}
          key={normal[3].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
      <div className={styles.n2}>
        <StigmaItemWrapper
          stigma={normal[4]}
          currentLvl={currentLvl}
          key={normal[4].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
    </div>

    <div className={styles.column}>
      <div className={styles.a2}>
        <StigmaItemWrapper
          stigma={advanced[2]}
          currentLvl={currentLvl}
          key={advanced[2].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
      <div className={styles.a3}>
        <StigmaItemWrapper
          stigma={advanced[3]}
          currentLvl={currentLvl}
          key={advanced[3].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
    </div>

    <div className={styles.column}>
      <div className={styles.a4}>
        <StigmaItemWrapper
          stigma={advanced[4]}
          currentLvl={currentLvl}
          key={advanced[4].id}
          stigmaAction={true}
          stigmaPos='tree'
        />
      </div>
    </div>

    <div className={styles.arrow1}><Arrow1 /></div>
    <Arrow2 />
    <Arrow3 />
    <div className={styles.arrow4}><Arrow1 /></div>
    <Arrow5 />
  </div>
}

export default StigmaTree
