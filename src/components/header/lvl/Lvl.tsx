import { TextField } from "@mui/material"
import { useRecoilState } from "recoil"
import { LvlProps } from "../../../Interfaces"
import { currentLvlInputedState } from "../../../store"
import styles from './Lvl.module.css'

const Lvl = ({currClassName}: LvlProps) => {
  const [currentLvlInputed, setCurrentLvlInputed] = useRecoilState<number>(currentLvlInputedState )
  const handleLvl = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    Number(event.target.value) && setCurrentLvlInputed(Number(event.target.value))
  }
  
  return <div className={styles.lvl}>
    <h3>{currClassName}</h3>
    <TextField
      sx={textFieldStyle}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9][0-9]', autoComplete: 'off' }}
      value={currentLvlInputed}
      onFocus={event => event.target.select()}
      onChange={(event) => handleLvl(event)}
    />
  </div>
}

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#f7912b"
    }
  }
}

export default Lvl