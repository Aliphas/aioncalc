import styles from './ClassesList.module.css'
import { NavLink } from 'react-router-dom';
import { ClassesListProps } from '../../Interfaces';


const ClassesList = (props: ClassesListProps) => {
  const { activeClassIndex, setActiveClassIndex, classesList, clear, side, lvl } = props

  const handleChangeClass = (index: number) => {
    clear && clear()
    activeClassIndex !== index && setActiveClassIndex(index)
  }

  return (
    <ul className={styles.classesList}>
      {classesList.map((item, index) => (
        <NavLink
          to={`/${item.name}/${Number(side)}${lvl}${Array(12).fill("00").join("")}`}
          className={activeClassIndex === index
            ? styles.active
            : styles.inactive}
          key={item.id}
          onClick={() => handleChangeClass(index)}
        >
          <li
            id={item.id}
            key={item.id}
            title={item.name}>
          </li>
        </NavLink>
      ))}
    </ul>
  )
}

export default ClassesList