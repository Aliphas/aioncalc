import styles from './StigmaSlots.module.css'
import { StigmaSlotsProps } from '../../Interfaces'
import { useRecoilValue } from 'recoil'
import { advancedSlots, advancedSlotsCount, normalSlots, normalSlotsCount } from '../../store'
import StigmaItemWrapper from '../stigmaItem/StigmaItemWrapper'

const StigmaSlots = (props: StigmaSlotsProps) => {
  const { currentLvl, stigmaAction } = props
  const nSlots = useRecoilValue(normalSlots)
  const aSlots = useRecoilValue(advancedSlots)
  const nCount = useRecoilValue(normalSlotsCount)
  const aCount = useRecoilValue(advancedSlotsCount)

  return (
    <div className={styles.stigmaSlots}>
      <div className={styles.nSlots}>
        {nSlots.map((slot, index) =>
          <div className={index < nCount ? styles.nSlot : styles.nSlotClosed} key={index}>
            <img src="https://raw.githubusercontent.com/Aliphas/aioncalc-images/main/global/stigmaslots.png" className={styles.nSlotImg} alt='Stigma slot'/>
            <div className={styles.stigmaIconBox}>
              {slot && index < nCount && <StigmaItemWrapper stigma={slot} currentLvl={currentLvl} stigmaAction={stigmaAction} stigmaPos='slot'/>}
            </div>
          </div>
        )}
      </div>
      <div className={styles.aSlots}>
        {aSlots.map((slot, index) =>
          <div className={index < aCount ? styles.aSlot : styles.aSlotClosed} key={index}>
          <img src='https://raw.githubusercontent.com/Aliphas/aioncalc-images/main/global/stigmaslots.png' className={styles.aSlotImg} alt='Stigma slot'/>
          <div className={styles.stigmaIconBox}>
            {slot && index < aCount && <StigmaItemWrapper stigma={slot} currentLvl={currentLvl} stigmaAction={stigmaAction} stigmaPos='slot'/>}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default StigmaSlots