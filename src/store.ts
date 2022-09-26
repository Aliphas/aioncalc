import { atom, selector } from 'recoil'
import classes from './classes.json'
import { ClassProps, StigmaProps } from './Interfaces'

export const activeClassIndexState = atom<number>({
  key: 'activeClassIndexState',
  default: 0
})
export const currentLvlState = atom<number>({
  key: 'currentLvlState',
  default: 65,
})
export const currentLvlInputedState = atom<number>({
  key: 'currentLvlInputed',
  default: 65,
})
export const classesState = atom<ClassProps[]>({
  key: 'classesState',
  default: classes
})
export const sideState = atom<boolean>({
  key: 'sideState',
  default: true
})

export const currClassValue = selector<ClassProps>({
  key: 'currClassValue',
  get: ({ get }) => {
    const classes = get(classesState)
    const index = get(activeClassIndexState)
    const currClass = classes[index]
    return currClass
  }
})
export const urlArrState = atom<Array<string>>({
  key: "urlArrState",
  default: Array(12).fill('nn')
})

export const normalSlots = atom<Array<StigmaProps | null>>({
  key: 'normalSlots',
  default: Array(6).fill(null)
})
export const normalSlotsCount = selector<number>({
  key: 'normalSlotsByLvl',
  get: ({ get }) => {
    const lvl = get(currentLvlState)
    let nCounter = 0;
    lvl < 30 ? nCounter = 2
    : lvl < 40 ? nCounter = 3
    : lvl < 50 ? nCounter = 4
    : lvl < 55 ? nCounter = 5
    : nCounter = 6
    return nCounter
  }
})
export const emptyNormalSlot = selector<Boolean>({
  key: 'emptyNormalSlot',
  get: ({ get }) => {
    const slots: (StigmaProps | null)[] = get(normalSlots)
    const isEmptySlot: boolean = (slots.find((slot: StigmaProps | null) => slot === null) === null) ? true : false
    return isEmptySlot
  }
})
export const advancedSlots = atom<Array<StigmaProps | null>>({
  key: 'advancedSlots',
  default: Array(6).fill(null)
})
export const advancedSlotsCount = selector<number>({
  key: 'advancedSlotsByLvl',
  get: ({ get }) => {
    const lvl = get(currentLvlState)
    let aCounter = 0;
    lvl < 45 ? aCounter = 0
    : lvl < 50 ? aCounter = 2
    : lvl < 52 ? aCounter = 3
    : lvl < 55 ? aCounter = 4
    : lvl < 58 ? aCounter = 5
    : aCounter = 6
    return aCounter
  }
})
