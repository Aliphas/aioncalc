import { useRecoilValue } from "recoil"
import { StigmaProps, RemoveSlotByCounterProps } from "../Interfaces"
import { currentLvlState } from "../store"
import useRemoveStigma from "./removeStigma"

export const useRemoveSlotByLvl = () => {
  const currentLvl = useRecoilValue<number>(currentLvlState)
  const removeStigma = useRemoveStigma()
  const removeSlotByLvl = (slots: (StigmaProps | null)[]) => {
    slots.map(slot => slot !== null && currentLvl >= 20 
      && currentLvl <= 65 && slot.lvl[0] > currentLvl && removeStigma(slot))
  }
  return removeSlotByLvl
}

export const useRemoveSlotByCounter = () => {
  const removeStigma = useRemoveStigma()
  const removeSlotByCounter = (props: RemoveSlotByCounterProps) => {
    props.slots.map((slot, index) => props.counter <= index && slot !== null && removeStigma(slot))
  }
  return removeSlotByCounter
}


