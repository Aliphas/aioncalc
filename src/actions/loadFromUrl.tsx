import { cloneDeep } from "lodash"
import { Location, useLocation } from "react-router-dom"
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { AddProps, ClassProps, StigmaProps } from "../Interfaces"
import { advancedSlots, advancedSlotsCount, classesState, currentLvlState, normalSlots, normalSlotsCount, sideState } from "../store"
import addLoadedStigma from "./addLoadedStigma"

const useLoadFromUrl = () => {
  const [classes, setClasses] = useRecoilState<ClassProps[]>(classesState)
  const location: Location = useLocation()
  const setSide: SetterOrUpdater<boolean> = useSetRecoilState(sideState)
  const setLvl: SetterOrUpdater<number> = useSetRecoilState(currentLvlState)
  const [nSlots, setNSlots] = useRecoilState<(StigmaProps | null)[]>(normalSlots)
  const [aSlots, setASlots] = useRecoilState<(StigmaProps | null)[]>(advancedSlots)
  const nCount: number = useRecoilValue(normalSlotsCount)
  const aCount: number = useRecoilValue(advancedSlotsCount)

  const loadFromUrl = (index: number) => {
    const urlSide: boolean = location.pathname.split('/')[2].slice(0, 1) === "0" ? false : true
    const urlLvl: number = Number(location.pathname.split('/')[2].slice(1, 3))
    const nSlotsClone: (StigmaProps | null)[] = cloneDeep(nSlots)
    const aSlotsClone: (StigmaProps | null)[] = cloneDeep(aSlots)
    const classesClone: ClassProps[] = cloneDeep(classes)

    const urlStigmaIds: string[] = location.pathname.split('/')[2]!.slice(3).match(/.{2}/g)!
    const urlStigmasArr: (StigmaProps | undefined)[] = urlStigmaIds.map(id => classes[index].stigmas.find(stigma => stigma.id === id)).filter(stigma => stigma)
    urlStigmasArr.map(currStigma => {
      const stigmaClone = cloneDeep(currStigma)
      const addProps: AddProps | undefined = stigmaClone ? { stigmaClone, classesClone, nSlotsClone, aSlotsClone, nCount, aCount, activeClassIndex: index } : undefined
      addProps && stigmaClone && addLoadedStigma({ stigmaClone, classesClone, nSlotsClone, aSlotsClone, nCount, aCount, activeClassIndex: index })
    })

    setSide(urlSide)
    setLvl(urlLvl)
    setClasses(classesClone)
    setNSlots(nSlotsClone)
    setASlots(aSlotsClone)
  }
  return loadFromUrl
}

export default useLoadFromUrl