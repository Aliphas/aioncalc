import { cloneDeep } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil"
import { RemoveProps, StigmaProps } from "../../Interfaces"
import { activeClassIndexState, advancedSlots, classesState, normalSlots } from "../../store"

const useRemoveStigma = () => {
  const [classes, setClasses] = useRecoilState(classesState)
  const [nSlots, setNSlots] = useRecoilState(normalSlots)
  const [aSlots, setASlots] = useRecoilState(advancedSlots)
  const activeClassIndex = useRecoilValue(activeClassIndexState)

  const removeStigma = (stigma: StigmaProps) => {
    const nSlotsClone = cloneDeep(nSlots)
    const aSlotsClone = cloneDeep(aSlots)
    const classesClone = cloneDeep(classes)
    const nIndex = nSlots.indexOf(stigma)
    const aIndex = aSlots.indexOf(stigma)

    nIndex !== -1 && remove({ stigma, classesClone, slots: nSlotsClone, index: nIndex, activeClassIndex })
    aIndex !== -1 && remove({ stigma, classesClone, slots: aSlotsClone, index: aIndex, activeClassIndex })

    aSlotsClone.map((slot, index) => {
      slot?.dependencies && slot.dependencies.map(dep => {
        stigma.id === dep && remove({ stigma: slot, classesClone, slots: aSlotsClone, index, activeClassIndex })
        classesClone[activeClassIndex].stigmas
          .find(currStigma => currStigma.id === dep)!.isActive === false && remove({ stigma: slot, classesClone, slots: aSlotsClone, index, activeClassIndex })
      })
    })
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
}

export default useRemoveStigma