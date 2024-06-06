
import { useTranslation } from "react-i18next";

// Components
import { Icon } from "../../../components/index"


export function AchievementPerType({ data, type, good, semi, bad, title, icon, colors, colorTitle, colorRGB, translationType}) {

  const { t } = useTranslation();

  const total = data[type].total.websites[good] + data[type].total.websites[semi] + data[type].total.websites[bad] + data[type].total.apps[good] + data[type].total.apps[semi] + data[type].total.apps[bad]
  const valueBad = data[type].total.websites[bad]+data[type].total.apps[bad]
  const valueSemi = data[type].total.websites[semi]+data[type].total.apps[semi]
  const valueGood = data[type].total.websites[good]+data[type].total.apps[good]

  // The number + the bar for each row
  const barStatsRow = (marginBottom, quantityTotal, barColor, type, barColorRGB, percentTotal) => {
    const percentageTotalGrey = 100 - percentTotal
    return (
      <div className={`d-flex ${marginBottom} w-100 row_st_dc`}>
        <span className="quantity">{quantityTotal}</span>
        <div className={`ps-2 ${barColor} conform_container`}>
          <span className="type">{type}</span>
        </div>
        <div className="d-flex flex-column justify-content-center ps-2">
          <div className="d-flex flex-row">
            <span className="bar" style={{background: `-webkit-linear-gradient(left, ${barColorRGB}, ${barColorRGB} ${percentTotal}%, rgb(220, 220, 219) ${percentTotal}%, rgb(220, 220, 219) ${percentageTotalGrey}%)`}}></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group_container p-5 mb-5 mt-4">
      <div className="first_column">
        <span className="subtitle smaller mb-3">{title}</span>
        <div className="icon">
          <span className="subtitle mb-3 me-2">{total}</span>
          <Icon name={icon} />
        </div>
      </div>
      <div className="second_column">
        <span className="mb-3 align-self-end">{t(`NUMBERS.${translationType}.percentTitle`)}</span>
        {barStatsRow("mb-5", valueGood, colors.good, colorTitle.good, colorRGB.good, valueGood*100/total)}
        {barStatsRow("mb-5", valueSemi, colors.semi, colorTitle.semi, colorRGB.semi, valueSemi*100/total)}
        {barStatsRow("", valueBad, colors.bad, colorTitle.bad, colorRGB.bad, valueBad*100/total)}
      </div>
    </div>
  )
}
