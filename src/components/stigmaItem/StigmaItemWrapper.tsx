import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { StigmaItemWrapperProps, StigmaProps } from "../../Interfaces"
import { advancedSlots, advancedSlotsCount, normalSlots, normalSlotsCount } from "../../store"
import useAddStigma from "../actions/addStigma"
import useRemoveStigma from "../actions/removeStigma"
import StigmaItem from "./StigmaItem"
import styles from "./StigmaItem.module.css"

const StigmaItemWrapper = (props: StigmaItemWrapperProps) => {
  const { stigma, currentLvl, stigmaAction, stigmaPos } = props
  const nSlots = useRecoilValue(normalSlots)
  const aSlots = useRecoilValue(advancedSlots)
  const nCount = useRecoilValue(normalSlotsCount)
  const aCount = useRecoilValue(advancedSlotsCount)
  const addStigma = useAddStigma()
  const removeStigma = useRemoveStigma()

  const removeSlotByLvl = (slots: (StigmaProps | null)[]) => {
    slots.map(slot => slot !== null && currentLvl >= 20 
      && currentLvl <= 65 && slot.lvl[0] > currentLvl && removeStigma(slot))
  }
  const removeSlotByCounter = (slots: (StigmaProps | null)[], counter: number) => {
    slots.map((slot, index) => counter <= index && slot !== null && removeStigma(slot))
  }

  useEffect(() => {
    // const timeOutId = setTimeout(() => removeSlotByLvl(nSlots), 100);
    // return () => clearTimeout(timeOutId);
    removeSlotByLvl(nSlots)
  }, [currentLvl, nSlots])
  useEffect(() => {
    removeSlotByLvl(aSlots)
  }, [currentLvl, aSlots])
  useEffect(() => {
    // const timeOutId = setTimeout(() => removeSlotByCounter(nSlots, nCount), 100);
    // return () => clearTimeout(timeOutId);
    removeSlotByCounter(nSlots, nCount)
  }, [nCount])
  useEffect(() => {
    // const timeOutId = setTimeout(() => removeSlotByCounter(aSlots, aCount), 100);
    // return () => clearTimeout(timeOutId);
    removeSlotByCounter(aSlots, aCount)
  }, [aCount])

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
      changeStigma={stigmaAction ? addStigma : removeStigma}//del
      stigmaStyle={styles.defaultStigma}
      />
    }   
  </>
}

export default StigmaItemWrapper