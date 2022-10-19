import { cloneDeep } from "lodash"
import { useLocation } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { AddProps, ClassProps, StigmaProps } from "../../Interfaces"
import { advancedSlots, advancedSlotsCount, classesState, normalSlots, normalSlotsCount } from "../../store"

const useAddStigma = () => {
  const [classes, setClasses] = useRecoilState(classesState)
  const [nSlots, setNSlots] = useRecoilState(normalSlots)
  const [aSlots, setASlots] = useRecoilState(advancedSlots)
  // const activeClassIndex = useRecoilValue(activeClassIndexState)
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
    const isAlreadyActive = nSlots.find(slot => slot?.id === stigma.id)
      || aSlots.find(slot => slot?.id === stigma.id)
    
    const addProps: AddProps = { stigmaClone, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount }
    !isAlreadyActive && ( !stigma.dependencies ? add(addProps) : addAdvanced(addProps) )
    
    setClasses(classesClone)
    setNSlots(nSlotsClone)
    setASlots(aSlotsClone)
    // console.log(stigma.name)
    const changedState = {classes, nSlots, aSlots}
    return changedState
  }
  return addStigma
}

const add = (props: AddProps) => {
  const { stigmaClone, nSlotsClone, aSlotsClone, nCount, aCount } = props
  const nIndex: number = nSlotsClone.indexOf(null)
  const aIndex: number = aSlotsClone.indexOf(null)

  !stigmaClone.isActive && !stigmaClone.dependencies && nIndex !== -1 && nCount > nIndex && (stigmaClone.isActive = true)
  !stigmaClone.isActive && !stigmaClone.dependencies && nIndex === -1 && aIndex !== -1 && aCount > aIndex && (stigmaClone.isActive = true)
  !stigmaClone.isActive && !stigmaClone.dependencies && aIndex !== -1 && aCount > aIndex && (stigmaClone.isActive = true)
  !stigmaClone.isActive && stigmaClone.dependencies && aIndex !== -1 && aCount > aIndex && (stigmaClone.isActive = true)

  stigmaClone.isActive === true && !stigmaClone.dependencies
    && nIndex !== -1 && nCount > nIndex && (nSlotsClone[nIndex] = stigmaClone)
  stigmaClone.isActive === true && !stigmaClone.dependencies 
    && nSlotsClone[nIndex] !== stigmaClone && (aSlotsClone[aIndex] = stigmaClone)
  stigmaClone.isActive === true && stigmaClone.dependencies
    && (aSlotsClone[aIndex] = stigmaClone)   
}

const addAdvanced = (props: AddProps) => {
  const { stigmaClone, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount  } = props
  let isDependencies: boolean = false
  const dependencies1: StigmaProps[] = stigmaClone.dependencies!.map(dep => (
    classesClone[activeClassIndex].stigmas
      .find(currStigma => currStigma.id === dep)!
  ))
  dependencies1.map(depStigma1 => {
    const dependencies2: StigmaProps[] | undefined = depStigma1.dependencies?.map(dep => (
      classesClone[activeClassIndex].stigmas
        .find(currStigma => currStigma.id === dep)!
    ))
    dependencies2 && dependencies2.map(depStigma2 => {
      const dependencies3: StigmaProps[] | undefined = depStigma2.dependencies?.map(dep => (
        classesClone[activeClassIndex].stigmas
          .find(currStigma => currStigma.id === dep)!
      ))
      dependencies3 && dependencies3.map(depStigma3 => {
        !depStigma3.isActive && add({ stigmaClone: depStigma3, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount })
        !depStigma3.isActive && (isDependencies = true)
      })
      !depStigma2.isActive && add({ stigmaClone: depStigma2, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount  })
      !depStigma2.isActive && (isDependencies = true)
    })

    !depStigma1.isActive && add({ stigmaClone: depStigma1, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount  })
    !depStigma1.isActive && (isDependencies = true)

  })
  const aIndex: number = aSlotsClone.indexOf(null)
  !stigmaClone.isActive && aIndex !== -1 && aCount > aIndex && (stigmaClone.isActive = true)
  !isDependencies && stigmaClone.isActive === true && (aSlotsClone[aIndex] = stigmaClone)
}



export default useAddStigma