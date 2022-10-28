import { AddProps } from "../Interfaces"

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

export default add

