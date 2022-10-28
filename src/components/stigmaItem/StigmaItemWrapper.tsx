import { cloneDeep } from "lodash"
import { useRecoilValue } from "recoil"
import { DescrInfoProps, StigmaItemWrapperProps } from "../../Interfaces"
import { sideState } from "../../store"
import useAddStigma from "../../actions/addStigma"
import getDescrInfo from "../../actions/getDescrInfo"
import useRemoveStigma from "../../actions/removeStigma"
import StigmaItem from "./StigmaItem"
import styles from "./StigmaItem.module.css"

const StigmaItemWrapper = (props: StigmaItemWrapperProps) => {
  const { stigma, currentLvl, stigmaAction, stigmaPos } = props
  const addStigma = useAddStigma()
  const removeStigma = useRemoveStigma()
  const stigmaClone = cloneDeep(stigma)
  const side = useRecoilValue(sideState)
  const reversedLvls = [...stigma.lvl].reverse()
  const currAvailableLvl: number | undefined  = reversedLvls
  .find((lvl) => lvl <= currentLvl)
  const lvlIndex: number = stigma.lvl.indexOf(currAvailableLvl || 0)
  const stageIndex = (stigma.stage2 && stigma.value && stigma.stage2.value) 
  ? (stigma.value[0].length - stigma.stage2.value[0].length) : 0
  const descrInfo: DescrInfoProps = getDescrInfo({side, stigma, lvlIndex, stageIndex})
  
  return  <>
    {
      stigma.lvl[0] > currentLvl ?
      <StigmaItem
        stigma={stigmaClone}
        descrInfo={descrInfo}
        currentLvl={currentLvl}
        requiredLvl={stigma.lvl[0]}
        key={stigma.id}
        stigmaStyle={styles.redStigma}
      />
      : stigmaPos === "tree" && stigma.isActive ?
      <StigmaItem
      stigma={stigmaClone}
      descrInfo={descrInfo}
      currentLvl={currentLvl}
      key={stigma.id}
      stigmaStyle={styles.greenStigma}
      />
      :<StigmaItem
      stigma={stigmaClone}
      descrInfo={descrInfo}
      currentLvl={currentLvl}
      key={stigma.id}
      changeStigma={stigmaAction ? addStigma : removeStigma}
      stigmaStyle={styles.defaultStigma}
      />
    }   
  </>
}

export default StigmaItemWrapper