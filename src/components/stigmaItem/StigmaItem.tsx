import styles from "./StigmaItem.module.css"
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React from "react";
import { StigmaGrade, StigmaItemProps } from "../../Interfaces";
import StigmaDescr from "../../StigmaDescr/StigmaDescr";
import { cloneDeep } from "lodash";
import { useRecoilValue } from "recoil";
import { sideState } from "../../store";

const StigmaItem = (props: StigmaItemProps) => {
  const { stigma, currentLvl, changeStigma, stigmaStyle, requiredLvl } = props
  const side = useRecoilValue(sideState)
  const stigmaClone = cloneDeep(stigma)
  const reversedLvls = [...stigma.lvl].reverse()
  const currLvl: number | undefined  = reversedLvls
  .find((lvl) => lvl <= currentLvl)
  const lvlIndex: number = stigma.lvl.indexOf(currLvl || 0)
  const stageIndex = (stigmaClone.stage2 && stigmaClone.value && stigmaClone.stage2.value) ? (stigmaClone.value[0].length - stigmaClone.stage2.value[0].length)
  : 0
  
  const currStigma: StigmaGrade = {
    name: !side && stigmaClone.name_ely ? stigmaClone.name_ely : stigmaClone.name,
    descr: !side && stigmaClone.descr_ely ? stigmaClone.descr_ely : stigmaClone.descr,
    descrMod: !side && stigmaClone.descrMod_ely ? stigmaClone.descrMod_ely : stigmaClone.descrMod,
    isActive: stigmaClone.isActive ? stigmaClone.isActive : false,
    romanNum: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][[0, 1, 2, 3, 4, 5, 6, 7, 8].indexOf(lvlIndex)],
    lvl: stigmaClone.lvl[lvlIndex],
    value: !side && stigmaClone.icon_ely ? stigmaClone.value_ely?.map(currValue => currValue[lvlIndex]) 
      : stigmaClone.value?.map(currValue => currValue[lvlIndex]),
    cost: stigmaClone.cost?.[lvlIndex],
    costMod: stigmaClone.costMod,
    cast: !side && stigmaClone.cast_ely ? stigmaClone.cast_ely : stigmaClone.cast,
    stage2: {
      descr: stigmaClone.stage2?.descr,
      cost: stigmaClone.stage2?.cost?.[lvlIndex - stageIndex],
      cast: stigmaClone.stage2?.cast,
      value: stigmaClone.stage2?.value?.map(currValue => currValue[lvlIndex])
    },
    stage3: {
      descr: stigmaClone.stage3?.descr,
      cost: stigmaClone.stage3?.cost?.[lvlIndex - stageIndex],
      cast: stigmaClone.stage3?.cast,
      value: stigmaClone.stage3?.value?.map(currValue => currValue[lvlIndex])
    },
    shards: stigmaClone.shards[lvlIndex],
    cooldown: stigmaClone.cooldown,
    icon: !side && stigmaClone.icon_ely ? stigmaClone.icon_ely[lvlIndex] : stigmaClone.icon[lvlIndex],
    dependencies: stigmaClone.dependencies,
    ap: stigmaClone.ap?.[lvlIndex]
  }
  
  const descrText: string[] = currStigma.descr.map((descr, index) => 
    (`${descr} ${currStigma.value?.[index] ? currStigma.value[index] : ""}`))
  const descrText2: string[] | undefined = (currStigma.stage2 && stageIndex <= lvlIndex) ? currStigma.stage2?.descr?.map((descr, index) => 
  (`${descr} ${stigmaClone.stage2?.value?.[index] ? stigmaClone.stage2.value[index][lvlIndex - stageIndex] : ""}`)) : undefined
  const descrText3: string[] | undefined = (currStigma.stage3 && stageIndex <= lvlIndex) ? currStigma.stage3?.descr?.map((descr, index) => 
  ( `${descr} ${stigmaClone.stage3?.value?.[index] ? stigmaClone.stage3.value[index][lvlIndex - stageIndex] : ""}`)) : undefined
  
  const stigmaHandleClick = () => changeStigma && changeStigma(stigma)

  return (
    <div className={styles.stigmaItem}>
      <HtmlTooltip
        title={
          <React.Fragment>
            <h3>{`${currStigma.name} ${currStigma.romanNum}`}</h3>
            <div className={styles.descr}>
              {currLvl &&
                <StigmaDescr
                  currStigma={currStigma}
                  styles={styles}
                  descrText={descrText}
                  descrText2={descrText2}
                  descrText3={descrText3} 
                  currentLvl={requiredLvl || currentLvl} />
                
              }
            </div>
          </React.Fragment>
        }
      >
      <div className={stigmaStyle}>
        <img
          src={currStigma.icon || stigmaClone.icon[0]}
          className={ styles.stigma }
          alt={stigma.name}
          onClick={stigmaHandleClick} 
        />
      </div>
      </HtmlTooltip>
    </div>

  )
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-start" followCursor />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff111',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  },
  [`& .${tooltipClasses.tooltip} h3`]: {
    borderBottom: '1px solid black',
    margin: "10px 0"
  },
  [`& .${tooltipClasses.tooltip} .descr`]: {
    borderBottom: '1px solid black'
  },
}));

export default StigmaItem