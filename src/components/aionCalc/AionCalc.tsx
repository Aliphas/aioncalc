import styles from './AionCalc.module.css';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import MainContent from '../mainContent/MainContent';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  activeClassIndexState,
  advancedSlots,
  classesState, currClassValue, currentLvlState, normalSlots, sideState, urlArrState
} from '../../store'
import { ClassProps } from '../../Interfaces';
import { cloneDeep } from 'lodash';
import Header from '../header/Header';

const AionCalc = () => {
  const [activeClassIndex, setActiveClassIndex] = useRecoilState<number>(activeClassIndexState)
  const currentLvl = useRecoilValue<number>(currentLvlState)
  const [classes, setClasses] = useRecoilState<ClassProps[]>(classesState)
  const currClass = useRecoilValue(currClassValue)
  const nSlotsReset = useResetRecoilState(normalSlots);
  const aSlotsReset = useResetRecoilState(advancedSlots)
  const side = useRecoilValue(sideState)
  const urlArr = useRecoilValue(urlArrState)

  const clear = () => {
    nSlotsReset()
    aSlotsReset()
    let classesClone = cloneDeep(classes)
    classesClone[activeClassIndex].stigmas = classesClone[activeClassIndex].stigmas.map(stigma => {
      stigma.isActive = false
      return stigma
    })
    setClasses(classesClone)
    setActiveClassIndex(classes.indexOf(currClass))
  }

  return (
    <div className={styles.aionCalcWrapper}>
      <div className={styles.aionCalc}>


        <BrowserRouter>
          <Header clear={clear} />

          <Routes>
            {classes.map((charClass, index) => (
              <Route
                path={`/${charClass.name}`}
                key={index}
                element={<MainContent
                  index={index}
                  clear={clear}
                  currentLvl={currentLvl}
                />}
              >
                <Route
                  path={`:sideParam/:lvlParam/:slotsParam`}
                  key={index}
                  element={
                    <MainContent
                      index={index}
                      clear={clear}
                      currentLvl={currentLvl}
                    />
                  }
                />
              </Route>
            ))}
            {/* <Route
              path="*"
              element={<Navigate replace to={`/${classes[activeClassIndex].name}/${Number(side)}/${currentLvl}/${urlArr.toString().replace(/,/g, '')}`} />}
            /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default AionCalc;
