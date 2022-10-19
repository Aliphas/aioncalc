import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeClassIndexState, advancedSlots, currClassValue, normalSlots, sideState } from '../../store'
import { ClassProps, MainContentProps, StigmaProps } from '../../Interfaces'
import StigmaList from '../stigmaList/StigmaList'
import StigmaSlots from '../stigmaSlots/StigmaSlots'
import StigmaTrees from '../stigmaTrees/StigmaTrees'
import styles from './MainContent.module.css'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useClear from '../actions/clear'
import useChangeUrl from '../actions/changeUrl'
import useLoadFromUrl from '../actions/loadFromUrl'
//   .match(/.{2}/g)

const MainContent = (props: MainContentProps) => {
  const { currentLvl, index } = props
  const currClass = useRecoilValue<ClassProps>(currClassValue)
  const setActiveClassIndex = useSetRecoilState(activeClassIndexState)
  const nSlots = useRecoilValue(normalSlots)
  const aSlots = useRecoilValue(advancedSlots)
  const side = useRecoilValue(sideState)
  const availableNormalStigmas: StigmaProps[]
    = currClass.stigmas.filter(stigma => !stigma.isActive && !stigma.dependencies)
  const navigate = useNavigate()
  const clear = useClear(index)
  const changeUrl = useChangeUrl(navigate)
  const location = useLocation()
  const loadFromUrl = useLoadFromUrl()
  const firstRender = useRef(true)

  useEffect(() => {
    setActiveClassIndex(index) 
    clear() 
  }, [index])
  useEffect(() => {
    firstRender.current && loadFromUrl(index)
    firstRender.current = false
  }, [location])
  
  useEffect(() => {
    !firstRender.current && changeUrl()
  }, [side, currentLvl, aSlots, nSlots])
  return (
    <div className={styles.mainContent}>
      <div className={styles.topPartWrapper}>
        <StigmaSlots
          currentLvl={currentLvl}
          stigmaAction={false} />
        <StigmaList
          currentLvl={currentLvl}
          stigmaList={availableNormalStigmas}
          stigmaAction={true} />
      </div>
      <StigmaTrees />
    </div>
  )
}

export default MainContent