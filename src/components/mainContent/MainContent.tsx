import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { activeClassIndexState, classesState, currClassValue, currentLvlInputedState, normalSlots, sideState, urlArrState } from '../../store'
import { ClassProps, MainContentProps, StigmaProps } from '../../Interfaces'
import StigmaList from '../stigmaList/StigmaList'
import StigmaSlots from '../stigmaSlots/StigmaSlots'
import StigmaTrees from '../stigmaTrees/StigmaTrees'
import styles from './MainContent.module.css'
import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useAddStigma from '../actions/addStigma'
import { cloneDeep } from 'lodash'

const MainContent = (props: MainContentProps) => {
  const { currentLvl, index, clear } = props
  const classes = useRecoilValue(classesState)
  const [activeClassIndex, setActiveClassIndex] = useRecoilState(activeClassIndexState)
  const currClass = useRecoilValue<ClassProps>(currClassValue)
  const addStigma = useAddStigma()
  const setSide = useSetRecoilState<boolean>(sideState)
  const setCurrentLvlInputed = useSetRecoilState<number>(currentLvlInputedState)
  let { classParam, sideParam, lvlParam, slotsParam } = useParams()
  const [urlArr, setUrlArr] = useRecoilState(urlArrState)
  const location = useLocation()

  // `/${classes[activeClassIndex].name}/${Number(side)}/${currentLvl}/${urlArr.toString().replace(/,/g, '')}`

  
  useEffect(() => {
    
    
    setActiveClassIndex(index)
    
  }, [index])
// let urlSlotsArr = slotsParam?.match(/.{2}/g)

useLayoutEffect(() => {
  setActiveClassIndex(index)
  sideParam !== '0' && sideParam !== '1' && (sideParam = '0')
  setSide(Number(sideParam) !== 1)
  Number(lvlParam) && setCurrentLvlInputed(Number(lvlParam)) 

  
  
}, [])

useLayoutEffect(() => {
  let urlSlotsArr = slotsParam?.match(/.{2}/g) || urlArr

  let UrlArrClone = cloneDeep(urlArr)
  UrlArrClone = urlSlotsArr.map((url, index) => url && (UrlArrClone[index] = url))
  setUrlArr(UrlArrClone)
  
  const filteredUrlSlotsArr = urlSlotsArr.filter(urlSlot => classes[activeClassIndex].stigmas.find(stigma => stigma.id === urlSlot))
  filteredUrlSlotsArr.map(urlSlot => addStigma(classes[activeClassIndex].stigmas.find(stigma => stigma.id === urlSlot)!))
}, [location])

useEffect(() => { 
  const urlArrClone = cloneDeep(urlArr)
  const filteredUrlSlotsArr = urlArrClone.filter(urlSlot => classes[activeClassIndex].stigmas.find(stigma => stigma.id === urlSlot))
  filteredUrlSlotsArr.map(urlSlot => addStigma(classes[activeClassIndex].stigmas.find(stigma => stigma.id === urlSlot)!))
}, [urlArr])
  
  const stigmaList: StigmaProps[] = currClass.stigmas //+
  const availableNormalStigmas: StigmaProps[]
    = stigmaList.filter(stigma => !stigma.isActive && !stigma.dependencies)
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