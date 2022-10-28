import { cloneDeep } from "lodash"
import { useLocation } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { AddProps, AddStigmaChangedProps, ClassProps, StigmaProps } from "../Interfaces"
import { advancedSlots, advancedSlotsCount, classesState, normalSlots, normalSlotsCount } from "../store"
import add from "./add"
import addAdvanced from "./addAdvanced"

const useAddStigma = () => {
  const [classes, setClasses] = useRecoilState(classesState)
  const [nSlots, setNSlots] = useRecoilState(normalSlots)
  const [aSlots, setASlots] = useRecoilState(advancedSlots)
  const nCount = useRecoilValue(normalSlotsCount)
  const aCount = useRecoilValue(advancedSlotsCount)
  const location = useLocation()
  const activeClass = classes.find(curr => curr.name === location.pathname.split("/")[1])!
  const activeClassIndex = classes.indexOf(activeClass)

  const addStigma = (stigma: StigmaProps) => {
    const nSlotsClone: (StigmaProps | null)[] = cloneDeep(nSlots)
    const aSlotsClone: (StigmaProps | null)[] = cloneDeep(aSlots)
    const classesClone: ClassProps[] = cloneDeep(classes)
    const stigmaClone: StigmaProps = classesClone[activeClassIndex].stigmas
      .find(currStigma => currStigma.id === stigma.id)!
    const isAlreadyActive: StigmaProps | null | undefined = nSlots.find(slot => slot?.id === stigma.id)
      || aSlots.find(slot => slot?.id === stigma.id)
    
    const addProps: AddProps = { stigmaClone, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount }
    !isAlreadyActive && ( !stigma.dependencies ? add(addProps) : addAdvanced(addProps) )
    
    setClasses(classesClone)
    setNSlots(nSlotsClone)
    setASlots(aSlotsClone)
    const changedState: AddStigmaChangedProps = {classes, nSlots, aSlots}
    return changedState
  }
  return addStigma
}

export default useAddStigma