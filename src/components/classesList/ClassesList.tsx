import styles from './ClassesList.module.css'
import { NavLink } from 'react-router-dom';
import { ClassesListProps } from '../../Interfaces';


const ClassesList = (props: ClassesListProps) => {
  const { activeClassIndex, setActiveClassIndex, classesList, clear } = props

  return (
    <ul className={styles.classesList}>
      {classesList.map((item, index) => (
        <NavLink
          to={`/${item.name}`}
          className={activeClassIndex === index
            ? styles.active
            : styles.inactive}
          key={item.id}
          onClick={() => activeClassIndex !== index ? setActiveClassIndex(index) : clear()}
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