import { cloneDeep } from "lodash"
import { ChangeUrlProps } from "../../Interfaces"

const useChangeUrl = () => {

  const changeUrl = (props: ChangeUrlProps) => {
    const {navigate, params, urlArr, setUrlArr, allSlots} = props
    let {activeClass: activeClass, sideParam, lvlParam } = params
    let urlArrClone = cloneDeep(urlArr)

    allSlots.map((slot, index) => slot !== null && (urlArrClone[index] = slot.id))
    setUrlArr(urlArrClone)
    
    // navigate(`/${activeClass.name}/${sideParam || 0}/${lvlParam || 65}/${urlArr.toString().replace(/[\s,]/g, '')}`)
    navigate(`/${activeClass.name}/${sideParam || 0}/${lvlParam || 65}/${urlArrClone.join("")}`)
    console.log(urlArr)
  }  
  
  return changeUrl
}

export default useChangeUrl
