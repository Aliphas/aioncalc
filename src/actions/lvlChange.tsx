import { useRecoilState } from "recoil"
import { currentLvlInputedState } from "../store"

const useLvlChange = () => {
  const [currentLvlInputed, setCurrentLvlInputed] = useRecoilState<number>(currentLvlInputedState)

  const lvlChange = (currentLvl: number) => {
    currentLvlInputed < 20 ? setCurrentLvlInputed(20)
      : currentLvlInputed > 65
        ? setCurrentLvlInputed(65)
        : setCurrentLvlInputed(currentLvl)
  }
  return lvlChange
}

export default useLvlChange