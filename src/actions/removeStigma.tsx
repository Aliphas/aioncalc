import { cloneDeep } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil"
import { ClassProps, RemoveProps, StigmaProps } from "../Interfaces"
import { activeClassIndexState, advancedSlots, classesState, normalSlots } from "../store"

const useRemoveStigma = () => {
  const [classes, setClasses] = useRecoilState<ClassProps[]>(classesState)
  const [nSlots, setNSlots] = useRecoilState<(StigmaProps | null)[]>(normalSlots)
  const [aSlots, setASlots] = useRecoilState<(StigmaProps | null)[]>(advancedSlots)
  const activeClassIndex: number = useRecoilValue(activeClassIndexState)

  const removeStigma = (stigma: StigmaProps) => {
    const nSlotsClone: (StigmaProps | null)[] = cloneDeep(nSlots)
    const aSlotsClone: (StigmaProps | null)[] = cloneDeep(aSlots)
    const classesClone: ClassProps[] = cloneDeep(classes)
    const nIndex: number = nSlots.indexOf(nSlots.find(slot => slot && slot.id === stigma.id)!)
    const aIndex: number = aSlots.indexOf(aSlots.find(slot => slot && slot.id === stigma.id)!)
    
    aSlotsClone.map((slot, index) => {
      slot?.dependencies && slot.dependencies.map(dep => {
        stigma.id === dep && remove({ stigma: slot, classesClone, slots: aSlotsClone, index, activeClassIndex })
        classesClone[activeClassIndex].stigmas
          .find(currStigma => currStigma.id === dep)!.isActive === false && remove({ stigma: slot, classesClone, slots: aSlotsClone, index, activeClassIndex })
      })
    })
    nIndex !== -1 && remove({ stigma, classesClone, slots: nSlotsClone, index: nIndex, activeClassIndex })
    aIndex !== -1 && remove({ stigma, classesClone, slots: aSlotsClone, index: aIndex, activeClassIndex })
    console.log(`remove ${stigma.name}, nIndex: ${nIndex}`)
    setClasses(classesClone)
    setNSlots(nSlotsClone)
    setASlots(aSlotsClone)
  }

  return removeStigma
}

const remove = (props: RemoveProps) => {
  const { stigma, classesClone, slots, index, activeClassIndex } = props
  classesClone[activeClassIndex].stigmas
    .find(currStigma => currStigma.id === stigma.id)!.isActive = false
  slots[index] = null

  return slots
}

export default useRemoveStigma