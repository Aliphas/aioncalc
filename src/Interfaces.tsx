import { NavigateFunction } from "react-router-dom";
import { SetterOrUpdater } from "recoil";

export interface HeaderProps {
  clear: () => void
}
export interface ClassProps {
  id: string
  name: string
  stigmas: StigmaProps[]
}
export type ClassesProps = ClassProps[]
export interface ClassList {
  id: string
  name: string
}
export interface ClassesListProps {
  activeClassIndex: number
  setActiveClassIndex: SetterOrUpdater<number>
  classesList: Array<ClassList>
  clear?: () => void
  side: boolean
  lvl: number
}
export interface MainContentProps {
  currentLvl: number
  index: number
}
export interface StigmaListProps {
  currentLvl: number
  stigmaList: StigmaProps[]
  stigmaAction: boolean
}
export interface StigmaItemWrapperProps {
  stigma: StigmaProps
  currentLvl: number
  stigmaAction: boolean
  stigmaPos: string
}
export interface StigmaItemProps {
  stigma: StigmaProps
  currentLvl: number
  requiredLvl?: number
  changeStigma?: (stigma: StigmaProps) => void
  // changeStigma?: any
  stigmaStyle: string
}
export interface StigmaProps {
  id: string,
  name: string
  name_ely?: string
  descr: string[]
  descr_ely?: string[]
  descrMod?: string[]
  descrMod_ely?: string[]
  isActive?: boolean
  lvl: Array<number>
  value?: Array<Array<string | number>>
  value_ely?: Array<Array<string | number>>
  cost?: Array<number>
  costMod?: string
  cast?: number
  cast_ely?: string | number
  stage2?: {
    descr: string[]
    cost?: Array<number>
    cast?: number
    value?: Array<Array<string | number>>
  }
  stage3?: {
    descr: string[]
    cost?: Array<number>
    cast?: number
    value?: Array<Array<string | number>>
  }
  shards: Array<number>
  cooldown?: number
  icon: Array<string>
  icon_ely?: Array<string>
  dependencies?: Array<string>
  ap?: Array<number>
}
export interface StigmaGrade {
  name: string
  name_ely?: string
  descr: string[]
  descrMod?: string[]
  isActive: boolean
  romanNum: string
  lvl: number
  value?: Array<string | number>
  cost?: number
  costMod?: string
  cast?: number | string
  stageIndex?: number
  stage2?: {
    descr?: string[]
    cost?: number
    cast?: number
    value?: Array<string | number>
  }
  stage3?: {
    descr?: string[]
    cost?: number
    cast?: number
    value?: Array<string | number>
  }
  cooldown?: number
  shards: number
  icon: string
  dependencies?: Array<StigmaProps["name"]>
  ap?: number
}
export interface StigmaDescrProps {
  currStigma: StigmaGrade
  styles: {
    readonly [key: string]: string;
  }
  descrText: string[]
  descrText2: string[] | undefined
  descrText3: string[] | undefined
  currentLvl: number
}
export interface StigmaSlotsProps {
  currentLvl: number
  stigmaAction: boolean
}
export interface AddStigmaProps {
  stigma: StigmaProps
  classesClone: ClassProps[],
  setClasses: SetterOrUpdater<ClassProps[]>
  nSlots: (StigmaProps | null)[]
  setNSlots: SetterOrUpdater<(StigmaProps | null)[]>
  aSlots: (StigmaProps | null)[]
  setASlots: SetterOrUpdater<(StigmaProps | null)[]>
  activeClassIndex: number
  nCount: number
  aCount: number
}
export interface AddProps {
  stigmaClone: StigmaProps,
  nSlotsClone: (StigmaProps | null)[],
  aSlotsClone: (StigmaProps | null)[],
  classesClone: ClassProps[],
  activeClassIndex: number,
  nCount: number,
  aCount: number
}
export interface AddAdvancedProps {
  stigmaClone: StigmaProps,
  nSlotsClone: (StigmaProps | null)[],
  aSlotsClone: (StigmaProps | null)[],
  classesClone: ClassProps[]
}
export interface RemoveProps {
  stigma: StigmaProps,
  slots: (StigmaProps | null)[],
  classesClone: ClassProps[],
  index: number,
  activeClassIndex: number
}
export interface ChangeUrlProps {
  navigate: NavigateFunction
  clear?: boolean
}
export interface LoadProps {

}
export interface Tree {
    advanced: StigmaProps[],
    normal: StigmaProps[]
}