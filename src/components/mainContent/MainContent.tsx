import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'
import { activeClassIndexState, advancedSlots, advancedSlotsCount, currClassValue, normalSlots, normalSlotsCount, sideState } from '../../store'
import { ClassProps, MainContentProps, StigmaProps } from '../../Interfaces'
import StigmaList from '../stigmaList/StigmaList'
import StigmaSlots from '../stigmaSlots/StigmaSlots'
import StigmaTrees from '../stigmaTrees/StigmaTrees'
import styles from './MainContent.module.css'
import { useEffect, useRef } from 'react'
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import useClear from '../../actions/clear'
import useChangeUrl from '../../actions/changeUrl'
import useLoadFromUrl from '../../actions/loadFromUrl'
import { useRemoveSlotByCounter, useRemoveSlotByLvl } from '../../actions/removeCondition'

const MainContent = (props: MainContentProps) => {
  const { currentLvl, index } = props
  const currClass: ClassProps = useRecoilValue<ClassProps>(currClassValue)
  const setActiveClassIndex: SetterOrUpdater<number> = useSetRecoilState(activeClassIndexState)
  const nSlots: (StigmaProps | null)[] = useRecoilValue(normalSlots)
  const aSlots: (StigmaProps | null)[] = useRecoilValue(advancedSlots)
  const side: boolean = useRecoilValue(sideState)
  const availableNormalStigmas: StigmaProps[]
    = currClass.stigmas.filter(stigma => !stigma.isActive && !stigma.dependencies)
  const navigate: NavigateFunction = useNavigate()
  const clear: () => void = useClear(index)
  const changeUrl: () => void = useChangeUrl(navigate)
  const location: Location = useLocation()
  const loadFromUrl: (index: number) => void = useLoadFromUrl()
  const firstRender: React.MutableRefObject<boolean> = useRef(true)
  const removeSlotByCounter = useRemoveSlotByCounter()
  const removeSlotByLvl = useRemoveSlotByLvl()
  const nCount = useRecoilValue(normalSlotsCount)
  const aCount = useRecoilValue(advancedSlotsCount)

  useEffect(() => {
    setActiveClassIndex(index) 
    clear() 
  }, [index])
  useEffect(() => {
    firstRender.current && loadFromUrl(index)
    firstRender.current = false
  }, [location])
  useEffect(() => {
    const timeOutId: NodeJS.Timeout = setTimeout(() => !firstRender.current && changeUrl(), 500);
    return () => clearTimeout(timeOutId);
  }, [side, currentLvl, aSlots, nSlots])
  useEffect(() => {
    removeSlotByLvl(nSlots)
  }, [currentLvl, nSlots])
  useEffect(() => {
    removeSlotByLvl(aSlots)
  }, [currentLvl, aSlots])
  useEffect(() => {
    removeSlotByCounter({slots: nSlots, counter: nCount})
  }, [nCount])
  useEffect(() => {
    removeSlotByCounter({slots: aSlots, counter: aCount})
  }, [aCount])

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