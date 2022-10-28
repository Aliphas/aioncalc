import { cloneDeep } from "lodash";
import { Resetter, useRecoilState, useResetRecoilState } from "recoil";
import { ClassProps } from "../Interfaces";
import { activeClassIndexState, advancedSlots, classesState, normalSlots } from "../store";

const useClear = (index?: number) => {
  const nSlotsReset: Resetter = useResetRecoilState(normalSlots)
  const aSlotsReset: Resetter = useResetRecoilState(advancedSlots)
  const [classes, setClasses] = useRecoilState<ClassProps[]>(classesState)
  const [activeClassIndex, setActiveClassIndex] = useRecoilState<number>(activeClassIndexState)
  
  const clear = () => {
    nSlotsReset()
    aSlotsReset()
    let classesClone = cloneDeep(classes)
    classesClone[activeClassIndex].stigmas = classesClone[activeClassIndex].stigmas.map(stigma => {
      stigma.isActive = false
      return stigma
    })
    setClasses(classesClone)
    index && setActiveClassIndex(index)
  }
  return clear
}

export default useClear