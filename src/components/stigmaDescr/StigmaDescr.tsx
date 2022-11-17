import { StigmaDescrProps } from "../../Interfaces";
import styles from './StigmaDescr.module.css'

const StigmaDescr = (props: StigmaDescrProps) => {
  const {currStigma} = props

  const numberToTime = (number: number) => {
    const s = number%60 > 0 ? `${number%60} sec` : ""
    const m = number >= 60 ? `${Math.floor(number/60)} min.`: ""
    return `${m} ${s}`
  }

  return (
    <div className={styles.descr}>
      {currStigma.descrText2 ? <div className={styles.stage}>Stage 1</div> : null}
      <div className={styles.descrText}>
        {currStigma.descrText1}
        {currStigma.descrMod && currStigma.descrMod.map(mod => (<div>{mod}</div>))}
      </div>
      <div className={styles.descrValues}>
        <div className={ !currStigma.lvl ? styles.redColor : ""}>Required lvl: {currStigma.lvl || currStigma.minLvl}</div>
        {currStigma.cost ? <div>Skill cost: {currStigma.cost}{currStigma.costMod ? currStigma.costMod: " MP"}</div> : null}
        <div>Cast time: {typeof currStigma.cast === "number" ? `${currStigma.cast} sec`:"Instant"}</div>
        {currStigma.cooldown ? <div>Cooldown: {numberToTime(currStigma.cooldown)}</div> : null}
      </div>
      { currStigma.descrText2 && currStigma.stage2 &&
        <>
          <div className={styles.stage}>Stage 2</div>
          <div className={styles.descrText}>{currStigma.descrText2}</div>
          <div className={styles.descrValues}>
            {currStigma.stage2.cost ? <div>Skill cost: {currStigma.stage2.cost}{currStigma.costMod ? currStigma.costMod: " MP"}</div> : null}
            {currStigma.stage2.cast ? <div>Cast time: {currStigma.stage2.cast} sec</div> : null}
          </div>
        </>
      }
      { currStigma.descrText3 && currStigma.stage3 &&
        <>
          <div className={styles.stage}>Stage 3</div>
          <div className={styles.descrText}>{currStigma.descrText3}</div>
          <div className={styles.descrValues}>
            {currStigma.stage3.cost ? <div>Skill cost: {currStigma.stage3.cost}{currStigma.costMod? currStigma.costMod: " MP"}</div> : null}
            {currStigma.stage3.cast ? <div>Cast time: {currStigma.stage3.cast} sec</div> : null}
          </div>
        </>
        
      }

      {currStigma.shards ? <div>Shards cost: {currStigma.shards}</div> : null}
      {currStigma.ap ? <div>Abbyss points: {currStigma.ap}</div> : null}
    </div>
  )
}

export default StigmaDescr