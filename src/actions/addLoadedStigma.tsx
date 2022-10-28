import { AddProps, StigmaProps } from "../Interfaces"
import add from "./add"
import addAdvanced from "./addAdvanced"

const addLoadedStigma = (props: AddProps) => {
  const {stigmaClone, classesClone, nSlotsClone, aSlotsClone, nCount, aCount, activeClassIndex} = props
  const currStigma: StigmaProps = classesClone[activeClassIndex].stigmas
      .find(currStigma => currStigma.id === stigmaClone.id)!
  const isAlreadyActive = nSlotsClone.find(slot => slot?.id === stigmaClone.id)
    || aSlotsClone.find(slot => slot?.id === stigmaClone.id)

  const addProps: AddProps = { stigmaClone: currStigma, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount }
  !isAlreadyActive && (!stigmaClone.dependencies ? add(addProps) : addAdvanced(addProps))
  const changedState = { stigmaClone, classesClone, nSlotsClone, aSlotsClone, nCount, aCount, activeClassIndex }
  return changedState
}

export default addLoadedStigma