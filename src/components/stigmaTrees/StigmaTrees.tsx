import { useRecoilValue } from 'recoil'
import { activeClassIndexState, classesState } from '../../store'
import StigmaTree from './StigmaTree'
import styles from './StigmaTrees.module.css'

const StigmaTrees = () => {
  const classes = useRecoilValue(classesState)
  const activeClassIndex = useRecoilValue(activeClassIndexState)
  const currClass = classes[activeClassIndex]
  const leftTree = {
    advanced: currClass.stigmas.filter(stigma => stigma.dependencies).slice(0, 5),
    normal: currClass.stigmas.filter(stigma =>
      stigma.dependencies).slice(0, 5).map(stigma =>
        stigma.dependencies!.map(dep =>
          currClass.stigmas.find(currStigma =>
            currStigma.id === dep && !currStigma.dependencies)!
        ).filter(stigma =>
          stigma !== undefined)).flat()
  }
  const rightTree = {
    advanced: currClass.stigmas.filter(stigma => stigma.dependencies).slice(5),
    normal: currClass.stigmas.filter(stigma =>
      stigma.dependencies).slice(5).map(stigma =>
        stigma.dependencies!.map(dep =>
          currClass.stigmas.find(currStigma =>
            currStigma.id === dep && !currStigma.dependencies)!
        ).filter(stigma =>
          stigma !== undefined)).flat()
  }

  return (
    <div className={styles.stigmaTrees}>
      <StigmaTree normal={leftTree.normal} advanced={leftTree.advanced} />
      <StigmaTree normal={rightTree.normal} advanced={rightTree.advanced} />
    </div>
  )
}

export default StigmaTrees