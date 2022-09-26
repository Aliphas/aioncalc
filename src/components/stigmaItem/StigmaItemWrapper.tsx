import { cloneDeep } from "lodash"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { AddProps, ClassProps, RemoveProps, StigmaItemWrapperProps, StigmaProps } from "../../Interfaces"
import { activeClassIndexState, advancedSlots, advancedSlotsCount, classesState, normalSlots, normalSlotsCount } from "../../store"
import useAddStigma from "../actions/addStigma"
import StigmaItem from "./StigmaItem"
import styles from "./StigmaItem.module.css"

const StigmaItemWrapper = (props: StigmaItemWrapperProps) => {
  const { stigma, currentLvl, stigmaAction, stigmaPos } = props
  const [classes, setClasses] = useRecoilState(classesState)
  const [nSlots, setNSlots] = useRecoilState(normalSlots)
  const [aSlots, setASlots] = useRecoilState(advancedSlots)
  const activeClassIndex = useRecoilValue(activeClassIndexState)
  const nCount = useRecoilValue(normalSlotsCount)
  const aCount = useRecoilValue(advancedSlotsCount)
  const uAddStigma = useAddStigma()
  let { slotsParam } = useParams()

  const removeSlotByLvl = (slots: (StigmaProps | null)[]) => {
    slots.map(slot => slot !== null && currentLvl >= 20 
      && currentLvl <= 65 && slot.lvl[0] > currentLvl && removeStigma(slot))
  }
  const removeSlotByCounter = (slots: (StigmaProps | null)[], counter: number) => {
    slots.map((slot, index) => counter <= index && slot !== null && removeStigma(slot))
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => removeSlotByLvl(nSlots), 500);
    return () => clearTimeout(timeOutId);
  }, [currentLvl, nSlots])
  useEffect(() => {
    removeSlotByLvl(aSlots)
  }, [currentLvl, aSlots])
  useEffect(() => {
    const timeOutId = setTimeout(() => removeSlotByCounter(nSlots, nCount), 100);
    return () => clearTimeout(timeOutId);
  }, [nCount])
  useEffect(() => {
    const timeOutId = setTimeout(() => removeSlotByCounter(aSlots, aCount), 100);
    return () => clearTimeout(timeOutId);
  }, [aCount])

  const removeStigma = (stigma: StigmaProps) => {
    const nSlotsClone = cloneDeep(nSlots)
    const aSlotsClone = cloneDeep(aSlots)
    const classesClone = cloneDeep(classes)
    const nIndex = nSlots.indexOf(stigma)
    const aIndex = aSlots.indexOf(stigma)

    nIndex !== -1 && remove({stigma, classesClone, slots: nSlotsClone, index: nIndex, activeClassIndex})
    aIndex !== -1 && remove({stigma, classesClone, slots: aSlotsClone, index: aIndex, activeClassIndex})

    aSlotsClone.map((slot, index) => {
      slot?.dependencies && slot.dependencies.map(dep => {     
        stigma.id === dep && remove({stigma: slot, classesClone, slots: aSlotsClone, index, activeClassIndex})
        classesClone[activeClassIndex].stigmas
          .find(currStigma => currStigma.id === dep)!.isActive === false && remove({stigma: slot, classesClone, slots: aSlotsClone, index, activeClassIndex})  
      })
    })
    setClasses(classesClone)
    setNSlots(nSlotsClone)
    setASlots(aSlotsClone)
  }
  const remove = (props: RemoveProps) => {
    const {stigma, classesClone, slots, index, activeClassIndex} = props
    classesClone[activeClassIndex].stigmas
      .find(currStigma => currStigma.id === stigma.id)!.isActive = false
    slots[index] = null
  }

  return  <>
  {
    stigma.lvl[0] > currentLvl ?
    <StigmaItem
      stigma={stigma}
      currentLvl={stigma.lvl[0]}
      requiredLvl={currentLvl}
      key={stigma.id}
      stigmaStyle={styles.redStigma}
    />
    : stigmaPos === "tree" && stigma.isActive ?
    <StigmaItem
    stigma={stigma}
    currentLvl={currentLvl}
    key={stigma.id}
    stigmaStyle={styles.greenStigma}
    />
    :<StigmaItem
    stigma={stigma}
    currentLvl={currentLvl}
    key={stigma.id}
    changeStigma={stigmaAction ? uAddStigma : removeStigma}//del
    stigmaStyle={styles.defaultStigma}
    />
  }   
  </>
}

export default StigmaItemWrapper