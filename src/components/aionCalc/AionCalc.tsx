import styles from './AionCalc.module.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainContent from '../mainContent/MainContent';
import { useRecoilValue } from 'recoil';
import {
  classesState, currentLvlState, sideState, urlArrState
} from '../../store'
import { ClassProps } from '../../Interfaces';
import Header from '../header/Header';

const AionCalc = () => {
  const currentLvl = useRecoilValue<number>(currentLvlState)
  const classes = useRecoilValue<ClassProps[]>(classesState)
  const side = useRecoilValue<boolean>(sideState)
  const urlArr = useRecoilValue<string[]>(urlArrState)

  return (
    <div className={styles.aionCalcWrapper}>
      <div className={styles.aionCalc}>
          <Header />
          <Routes>
            {classes.map((charClass, index) => (
              <Route
                path={`${charClass.name}/*`}
                key={index}
                element={<MainContent
                  index={index}
                  currentLvl={currentLvl}
                />}
              />
            ))}
            <Route
              path="/"
              element={<Navigate replace to={`${classes[0].name}/${Number(side)}${currentLvl}${urlArr.join("")}`} />}
            />
          </Routes>
      </div>
    </div>
  );
}

export default AionCalc
