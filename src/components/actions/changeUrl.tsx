import { NavigateFunction } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { advancedSlots, currClassValue, currentLvlState, normalSlots, sideState } from "../../store"

const useChangeUrl = (navigate: NavigateFunction) => {
  const currClass = useRecoilValue(currClassValue)
  const currLvl = useRecoilValue(currentLvlState)
  const currSide = useRecoilValue(sideState)
  const nSlots = useRecoilValue(normalSlots)
  const aSlots = useRecoilValue(advancedSlots)
  const slots = nSlots.concat(aSlots).map(slot => slot?.id || "00").join("")

  const changeUrl = () => {
    navigate(`/${currClass.name}/${Number(currSide)}${currLvl}${slots}`)
  }  
  return changeUrl
}

export default useChangeUrl
