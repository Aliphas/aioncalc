import { DescrInfoProps, GetDescrInfo } from "../Interfaces"

const getDescrInfo = (props: GetDescrInfo) => {
  const {side, stigma, lvlIndex, stageIndex} = props

      const descrInfo: DescrInfoProps = {
        name: !side && stigma.name_ely ? stigma.name_ely : stigma.name,
        descr: !side && stigma.descr_ely ? stigma.descr_ely : stigma.descr,
        descrMod: !side && stigma.descrMod_ely ? stigma.descrMod_ely : stigma.descrMod,
        isActive: stigma.isActive ? stigma.isActive : false,
        romanNum: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][[0, 1, 2, 3, 4, 5, 6, 7, 8].indexOf(lvlIndex)],
        lvl: stigma.lvl[lvlIndex],
        minLvl: stigma.lvl[0],
        value: !side && stigma.icon_ely ? stigma.value_ely?.map(currValue => currValue[lvlIndex]) 
          : stigma.value?.map(currValue => currValue[lvlIndex]),
        cost: stigma.cost?.[lvlIndex],
        costMod: stigma.costMod,
        cast: !side && stigma.cast_ely ? stigma.cast_ely : stigma.cast,
        stage2: {
          descr: stigma.stage2?.descr,
          cost: stigma.stage2?.cost?.[lvlIndex - stageIndex],
          cast: stigma.stage2?.cast,
          value: stigma.stage2?.value?.map(currValue => currValue[lvlIndex])
        },
        stage3: {
          descr: stigma.stage3?.descr,
          cost: stigma.stage3?.cost?.[lvlIndex - stageIndex],
          cast: stigma.stage3?.cast,
          value: stigma.stage3?.value?.map(currValue => currValue[lvlIndex])
        },
        shards: stigma.shards[lvlIndex],
        cooldown: stigma.cooldown,
        icon: !side && stigma.icon_ely ? stigma.icon_ely[lvlIndex] : stigma.icon[lvlIndex],
        dependencies: stigma.dependencies,
        ap: stigma.ap?.[lvlIndex],
        descrText1: !side && stigma.descr_ely ? stigma.descr_ely : stigma.descr.map((descr, index) => 
          (`${descr} ${stigma.value?.[index] ? stigma.value[index][lvlIndex] : ""}`)),
        descrText2: (stigma.stage2 && stageIndex <= lvlIndex) ? stigma.stage2?.descr?.map((descr, index) => 
          (`${descr} ${stigma.stage2?.value?.[index] ? stigma.stage2.value[index][lvlIndex - stageIndex] : ""}`)) : undefined,
        descrText3:  (stigma.stage3 && stageIndex <= lvlIndex) ? stigma.stage3?.descr?.map((descr, index) => 
          ( `${descr} ${stigma.stage3?.value?.[index] ? stigma.stage3.value[index][lvlIndex - stageIndex] : ""}`)) : undefined
      }
  return descrInfo
}

export default getDescrInfo