import { cloneDeep } from "lodash"
import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { AddProps, ChangeUrlProps, ClassProps, LoadProps, RemoveProps, StigmaProps } from "../../Interfaces"
import { activeClassIndexState, advancedSlots, advancedSlotsCount, classesState, normalSlots, normalSlotsCount, urlArrState } from "../../store"
import useChangeUrl from "./changeUrl"

const useAddStigma = () => {
  const [classes, setClasses] = useRecoilState(classesState)
  const [nSlots, setNSlots] = useRecoilState(normalSlots)
  const [aSlots, setASlots] = useRecoilState(advancedSlots)
  const activeClassIndex = useRecoilValue(activeClassIndexState)
  const nCount = useRecoilValue(normalSlotsCount)
  const aCount = useRecoilValue(advancedSlotsCount)
  let navigate = useNavigate()
  const [urlArr, setUrlArr ] = useRecoilState(urlArrState)
  let { sideParam, lvlParam, slotsParam } = useParams()
  const params = {sideParam, lvlParam, slotsParam , activeClass: classes[activeClassIndex]}
  const nSlotsClone: (StigmaProps | null)[] = cloneDeep(nSlots)
    const aSlotsClone: (StigmaProps | null)[] = cloneDeep(aSlots)
  const allSlots = nSlotsClone.concat(aSlotsClone)
  const changeUrl = useChangeUrl()
  useEffect(() => {
    changeUrl({navigate, params, urlArr, setUrlArr, allSlots})
  }, [])

  const addStigma = (stigma: StigmaProps) => {
    const nSlotsClone: (StigmaProps | null)[] = cloneDeep(nSlots)
    const aSlotsClone: (StigmaProps | null)[] = cloneDeep(aSlots)
    const classesClone: ClassProps[] = cloneDeep(classes)
    const stigmaClone: StigmaProps = classesClone[activeClassIndex].stigmas
      .find(currStigma => currStigma.id === stigma.id)!
    const isAlreadyActive = nSlots.find(slot => slot?.id === stigma.id)
      || aSlots.find(slot => slot?.id === stigma.id)
    
    const addProps: AddProps = { stigmaClone, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount, navigate, params, urlArr, setUrlArr }
    !isAlreadyActive && ( !stigma.dependencies ? add(addProps) : addAdvanced(addProps) )
    
    setClasses(classesClone)
    setNSlots(nSlotsClone)
    setASlots(aSlotsClone)  

    

    
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
  const { stigmaClone, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount, navigate, params, urlArr, setUrlArr  } = props
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
        !depStigma3.isActive && add({ stigmaClone: depStigma3, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount, navigate, params, urlArr, setUrlArr })
        !depStigma3.isActive && (isDependencies = true)
      })
      !depStigma2.isActive && add({ stigmaClone: depStigma2, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount, navigate, params, urlArr, setUrlArr  })
      !depStigma2.isActive && (isDependencies = true)
    })

    !depStigma1.isActive && add({ stigmaClone: depStigma1, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount, navigate, params, urlArr, setUrlArr  })
    !depStigma1.isActive && (isDependencies = true)

  })
  const aIndex: number = aSlotsClone.indexOf(null)
  !stigmaClone.isActive && aIndex !== -1 && aCount > aIndex && (stigmaClone.isActive = true)
  !isDependencies && stigmaClone.isActive === true && (aSlotsClone[aIndex] = stigmaClone)
}

const useRemoveStigma = (stigma: StigmaProps) => {
  const [classes, setClasses] = useRecoilState(classesState)
  const [nSlots, setNSlots] = useRecoilState(normalSlots)
  const [aSlots, setASlots] = useRecoilState(advancedSlots)
  const activeClassIndex = useRecoilValue(activeClassIndexState)

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

const remove = (props: RemoveProps) => {
  const { stigma, classesClone, slots, index, activeClassIndex } = props
  classesClone[activeClassIndex].stigmas
    .find(currStigma => currStigma.id === stigma.id)!.isActive = false
  slots[index] = null
}

export default useAddStigma