
import { useTranslation } from "react-i18next";

// Components
import { Icon } from "ama-design-system"


export function AchievementPerType({ data, type, good, semi, bad, title, icon, colors, colorTitle, translationType}) {

  const { t } = useTranslation();

  const total = data[type].total.websites[good] + data[type].total.websites[semi] + data[type].total.websites[bad] + data[type].total.apps[good] + data[type].total.apps[semi] + data[type].total.apps[bad]
  const valueBad = data[type].total.websites[bad]+data[type].total.apps[bad]
  const valueSemi = data[type].total.websites[semi]+data[type].total.apps[semi]
  const valueGood = data[type].total.websites[good]+data[type].total.apps[good]

  // The number + the bar for each row
  const barStatsRow = (marginBottom, quantityTotal, barColor, type, percentTotal) => {
    return (
      <div className={`d-flex ${marginBottom} w-100 row_st_dc align-items-center`}>
        <p className="d-flex w-50">
          <div className="d-flex flex-row w-50" role="text">
            <span className="ama-typography-display-6 bold quantity">{quantityTotal}</span>
            <span className={`d-flex ps-2 ${barColor} conform_container ama-typography-body bold align-items-center`}>{type}</span>
          </div>
        </p>
        <progress className={`bar ${barColor}`} value={`${percentTotal}`} max="100"/>
      </div>
    )
  }

  return (
    <div className="d-flex group_container p-5 mb-5 mt-4">
      <p className="d-flex flex-column first_column">
        <div role="text">
          <span className="ama-typography-body-larger bold mb-3">{title}</span>
          <span className="d-flex flex-row align-items-center ama-typography-display-1">
            {total}
            <Icon name={icon} />
          </span>
        </div>
      </p>
      <div className="d-flex flex-column second_column">
        <div className="ama-typography-body mb-3 align-self-end">{t(`NUMBERS.${translationType}.percentTitle`)}</div>
        {barStatsRow("mb-5", valueGood, colors.good, colorTitle.good, valueGood*100/total)}
        {barStatsRow("mb-5", valueSemi, colors.semi, colorTitle.semi, valueSemi*100/total)}
        {barStatsRow("", valueBad, colors.bad, colorTitle.bad, valueBad*100/total)}
      </div>
    </div>
  )
}
