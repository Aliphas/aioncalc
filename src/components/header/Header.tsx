import ClassesList from '../classesList/ClassesList';
import styles from './Header.module.css';
import { ClassList, ClassProps } from '../../Interfaces';
import { activeClassIndexState, apTotal, classesState, currClassValue, currentLvlInputedState, currentLvlState, shardsTotal, sideState } from '../../store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import useClear from '../../actions/clear';
import useLvlChange from '../../actions/lvlChange';
import Lvl from './lvl/Lvl';
import Cost from './cost/Cost';

const Header = () => {
  const [activeClassIndex, setActiveClassIndex] = useRecoilState<number>(activeClassIndexState)
  const [currentLvl, setCurrentLvl] = useRecoilState<number>(currentLvlState)
  const currentLvlInputed: number = useRecoilValue(currentLvlInputedState)
  const classes: ClassProps[] = useRecoilValue(classesState)
  const classesList: ClassList[] = classes.map(el => ({ id: el.id, name: el.name }))
  const currClass: ClassProps = useRecoilValue(currClassValue)
  const currClassName: string = currClass.name[0].toUpperCase() + currClass.name.slice(1)
  const [side, setSide] = useRecoilState<boolean>(sideState)
  const shards: number = useRecoilValue<number>(shardsTotal)
  const ap: number = useRecoilValue(apTotal)
  const clear: () => void = useClear()
  const lvlChange: (currentLvl: number) => void = useLvlChange()

  useEffect(() => {
    const timeOutId: NodeJS.Timeout = setTimeout(() => setCurrentLvl(currentLvlInputed || currentLvl), 500);
    return () => clearTimeout(timeOutId);
  }, [currentLvlInputed])
  useEffect(() => {
    lvlChange(currentLvl)
  }, [currentLvl]);

  const toggleSide: () => void = () => { setSide(!side) }

  return <header className={styles.header}>
    <h1>Aion stigma calculator</h1>
    <ClassesList
      activeClassIndex={activeClassIndex}
      setActiveClassIndex={setActiveClassIndex}
      classesList={classesList}
      clear={clear}
      side={side}
      lvl={currentLvl}
    />
    <div className={styles.topBar}>
      <div className={styles.leftSide}>
        <div className={styles.sides}>
          <div className={side ? styles.asmo : styles.ely} onClick={() => toggleSide()}>
            <img src='https://raw.githubusercontent.com/Aliphas/aioncalc-images/main/global/races.png' alt='sides' />
          </div>
        </div>
        <Lvl currClassName={currClassName} />  
      </div>
      <Cost shards={shards} ap={ap}/>  
    </div>
  </header>
}

export default Header