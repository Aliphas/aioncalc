import { AddProps, StigmaProps } from "../Interfaces"
import add from "./add"

const addAdvanced = (props: AddProps) => {
  const { stigmaClone, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount  } = props
  let isDependencies: boolean = false
  const dependencies1: StigmaProps[] = stigmaClone.dependencies!.map(dep => (
    classesClone[activeClassIndex].stigmas
      .find(currStigma => currStigma.id === dep)!
  ))
  dependencies1.map(depStigma1 => {
    const dependencies2: StigmaProps[] | undefined = depStigma1.dependencies?.map(dep => (
      classesClone[activeClassIndex].stigmas
        .find(currStigma => currStigma.id === dep)!
    ))
    dependencies2 && dependencies2.map(depStigma2 => {
      const dependencies3: StigmaProps[] | undefined = depStigma2.dependencies?.map(dep => (
        classesClone[activeClassIndex].stigmas
          .find(currStigma => currStigma.id === dep)!
      ))
      dependencies3 && dependencies3.map(depStigma3 => {
        !depStigma3.isActive && add({ stigmaClone: depStigma3, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount })
        !depStigma3.isActive && (isDependencies = true)
      })
      !depStigma2.isActive && add({ stigmaClone: depStigma2, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount  })
      !depStigma2.isActive && (isDependencies = true)
    })

    !depStigma1.isActive && add({ stigmaClone: depStigma1, nSlotsClone, aSlotsClone, classesClone, activeClassIndex, nCount, aCount  })
    !depStigma1.isActive && (isDependencies = true)

  })
  const aIndex: number = aSlotsClone.indexOf(null)
  !stigmaClone.isActive && aIndex !== -1 && aCount > aIndex && (stigmaClone.isActive = true)
  !isDependencies && stigmaClone.isActive === true && (aSlotsClone[aIndex] = stigmaClone)
}

export default addAdvanced