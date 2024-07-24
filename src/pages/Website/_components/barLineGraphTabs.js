// Hooks
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Components
import { Tabs, SortingTable } from "ama-design-system";

// Extra Data / Functions
import { getBarLineGraph, getBarLineTable } from "../utils"

// Chart Lib
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, registerables as registerablesJS } from 'chart.js';
import { Bar, Line, Chart } from 'react-chartjs-2';
ChartJS.register(...registerablesJS);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
);

export function BarLineGraphTabs({ tempData, websiteStats }) {

  const { t, i18n: { language } } = useTranslation();

  // Theme
  const { theme } = useContext(ThemeContext);

  // Data for "Distribuição de pontuações" tabs
  const [dataTable, setDataTable] = useState();
  const [dataForBar, setDataForBar] = useState();
  const [dataForLine, setDataForLine] = useState();
  
  // Bar/Line
  const { headersBarLine, dataBarLine, optionsBarLine } = getBarLineGraph(t, dataForLine, dataForBar, websiteStats, theme)
  const { dataHeaders,  columnsOptions } = getBarLineTable(t)

  const tabs = [
    {
      eventKey: "tab1",
      title: t("DIALOGS.scores.chart_title"),
      component:
      <div className="overflow">
        <div className="barLineContainer">
          <Bar data={dataBarLine} options={optionsBarLine} aria-label={t("DIALOGS.scores.title")} />
        </div>
      </div>,
    },
    {
      eventKey: "tab2",
      title: t("DIALOGS.scores.table"),
      component: <div>
        <SortingTable
          hasSort={false}
          headers={dataHeaders}
          dataList={dataTable}
          darkTheme={theme}
          pagination={false}
          links={false}
          caption={t("DIALOGS.scores.table")}
          columnsOptions={columnsOptions}
        />
      </div>,
    },
  ];

  useEffect(() => {
    let tempDataForBar = []
    let tempDataForLine = []
    let dataTableFrequency = []
    tempData && tempData.scoreDistributionFrequency.length > 0 && tempData.scoreDistributionFrequency.map((value, index) => {
      const percentage = (value*100/tempData.nPages).toFixed(1)
      tempDataForBar.push(percentage)

      let cumulative = 0
      let cumulativePercent = 0
      if(index === 0){
        cumulative = value
        cumulativePercent = percentage
      } else {
        const sum = value+dataTableFrequency[index-1].cumulative
        cumulative = sum
        cumulativePercent = (sum*100/tempData.nPages).toFixed(1)
      }
      tempDataForLine.push(cumulativePercent)

      dataTableFrequency.push({
        range: headersBarLine[index],
        frequency: value,
        frequency_percent: percentage+"%",
        cumulative: cumulative,
        cumulative_percent: cumulativePercent+"%"
      })
    })
    setDataForBar(tempDataForBar)
    setDataForLine(tempDataForLine)
    setDataTable(dataTableFrequency)

  }, [tempData, language, theme])

  return (
    <div className="BarLine_section tabs_section">
      <Tabs tabs={tabs} defaultActiveKey="tab1" vertical={false} />
    </div>
  );
}
