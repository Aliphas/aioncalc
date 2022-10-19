import { useLocation } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { StigmaProps } from "../../Interfaces"
import { classesState, currentLvlState, normalSlots, sideState } from "../../store"
import useAddStigma from "./addStigma"

const useLoadFromUrl = () => {
  const classes = useRecoilValue(classesState)
  const location = useLocation()
  const addStigma = useAddStigma()
  const setSide = useSetRecoilState(sideState)
  const setLvl = useSetRecoilState(currentLvlState)
  const nSlots = useRecoilValue(normalSlots)

  const loadFromUrl = (index: number) => {
    const urlSide: boolean = location.pathname.split('/')[2].slice(0, 1) === "0" ? false : true
    const urlLvl: number = Number(location.pathname.split('/')[2].slice(1, 3))
    // urlStigmaIds - array of strings with stigma ids
    const urlStigmaIds: string[] = location.pathname.split('/')[2]!.slice(3).match(/.{2}/g)!
    // urlStigmasArr - list of stigmas to install
    const urlStigmasArr: (StigmaProps | undefined)[] = urlStigmaIds.map(id => classes[index].stigmas.find(stigma => stigma.id === id))

    setSide(urlSide)
    setLvl(urlLvl)
    // Install all stigmas from url
    urlStigmasArr.map(currStigma => {
      const test = currStigma && !currStigma.isActive && addStigma(currStigma)
      console.log()
    })
  }
  return loadFromUrl
}


export default useLoadFromUrl