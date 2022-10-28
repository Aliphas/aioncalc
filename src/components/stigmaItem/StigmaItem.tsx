import styles from "./StigmaItem.module.css"
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import React from "react";
import { StigmaItemProps } from "../../Interfaces";
import StigmaDescr from "../stigmaDescr/StigmaDescr";

const StigmaItem = (props: StigmaItemProps) => {
  const { stigma, descrInfo, currentLvl, changeStigma, stigmaStyle, requiredLvl } = props

  const stigmaHandleClick = () => changeStigma && changeStigma(stigma)
  
  return (
    <div className={styles.stigmaItem}>
      <HtmlTooltip
        title={
          <React.Fragment>
            <h3>{`${descrInfo.name} ${descrInfo.romanNum || 'I'}`}</h3>
            <div className={styles.descr}>
              <StigmaDescr
                currStigma={descrInfo}
                styles={styles}
                descrText={descrInfo.descrText1}
                descrText2={descrInfo.descrText2}
                descrText3={descrInfo.descrText3}
                currentLvl={requiredLvl || currentLvl} />
            </div>
          </React.Fragment>
        }
      >
        <div className={stigmaStyle}>
          <img
            src={descrInfo.icon || stigma.icon[0]}
            className={styles.stigma}
            alt={descrInfo.name}
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
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    backgroundColor: '#404040',
    borderRadius: '5px',
    outline: '2px solid #f7912b',
    color: '#f7912b'
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