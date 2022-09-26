import { TextField } from '@mui/material';
import ClassesList from '../classesList/ClassesList';
import styles from './Header.module.css';
import { ClassList, ClassProps, HeaderProps } from '../../Interfaces';
import { activeClassIndexState, classesState, currClassValue, currentLvlInputedState, currentLvlState, sideState, urlArrState } from '../../store';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';


const Header = ({ clear }: HeaderProps) => {
  const [activeClassIndex, setActiveClassIndex] = useRecoilState<number>(activeClassIndexState)
  const [currentLvl, setCurrentLvl] = useRecoilState<number>(currentLvlState)
  const [currentLvlInputed, setCurrentLvlInputed] = useRecoilState<number>(currentLvlInputedState)
  const classes = useRecoilValue<ClassProps[]>(classesState)
  const classesList: ClassList[] = classes.map(el => ({ id: el.id, name: el.name }))
  const currClass = useRecoilValue<ClassProps>(currClassValue)
  const [side, setSide] = useRecoilState<boolean>(sideState)
  const setUrlArr = useSetRecoilState(urlArrState)

  useEffect(() => {
    const timeOutId = setTimeout(() => setCurrentLvl(currentLvlInputed || currentLvl), 500);
    return () => clearTimeout(timeOutId);
  }, [currentLvlInputed])
  const lvlChange = () => {
    currentLvlInputed < 20 ? setCurrentLvlInputed(20)
      : currentLvlInputed > 65
        ? setCurrentLvlInputed(65)
        : setCurrentLvlInputed(currentLvl)
  }
  useEffect(() => {
    lvlChange()
  }, [currentLvl]);

  useEffect(() => {
    clear()
    setUrlArr(Array(12).fill('nn'))
  }, [activeClassIndex])//activeClassId

  const handleLvl = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    Number(event.target.value) && setCurrentLvlInputed(Number(event.target.value))
  }
  const toggleSide = () => { setSide(!side) }

  const currClassName = currClass.name[0].toUpperCase() + currClass.name.slice(1)

  return <header className={styles.header}>
    <h1>Aion stigma calculator</h1>
    <ClassesList
      activeClassIndex={activeClassIndex}
      setActiveClassIndex={setActiveClassIndex}
      classesList={classesList}
      clear={clear}
    />
    <div className={styles.topBar}>
      <div className={styles.sides}>
        <div className={side ? styles.asmo : styles.ely} onClick={() => toggleSide()}>
          <img src="https://raw.githubusercontent.com/Aliphas/aioncalc-images/main/global/races.png" alt="sides" />
        </div>
      </div>
      <div className={styles.lvl}>
        <h3>{currClassName}</h3>
        <TextField
          sx={{
            '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: "1px solid black"
            }
          }}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9][0-9]', autoComplete: 'off'}}
          value={currentLvlInputed}
          onFocus={event => event.target.select()}
          onChange={(event) => handleLvl(event)}
        />
      </div>


    </div>

  </header>
}

export default Header