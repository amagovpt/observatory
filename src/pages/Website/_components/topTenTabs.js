// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Components
import { Tabs, SortingTable } from "ama-design-system";

// Extra Data / Functions
import { getTopTenGraphTable } from "../utils"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TopTenTabs({ top10Data, color, aditionalData, title }) {

  const { t, i18n: { language } } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [dataForHorizontal, setDataForHorizontal] = useState();
  const [labelsForHorizontal, setLabelsForHorizontal] = useState();
  const [dataTable, setDataTable] = useState();

  const { dataHeaders, columnsOptions, optionsHorizontalBar, horizontalData } = getTopTenGraphTable(t, theme, labelsForHorizontal, dataForHorizontal, color)

  const tabs = [
    {
      eventKey: "tab1",
      title: t("DIALOGS.scores.chart_title"),
      component: 
      <div className="overflow">
        <div className="barLineContainer">
          <Bar data={horizontalData} options={optionsHorizontalBar} aria-label={title} />
        </div>
      </div>,
    },
    {
      eventKey: "tab2",
      title: t("DIALOGS.scores.table"),
      component: <div className="dark_table">
        <SortingTable
          hasSort={false}
          headers={dataHeaders}
          dataList={dataTable}
          columnsOptions={columnsOptions}
          darkTheme={theme}
          pagination={false}
          links={false}
          caption={title}
        />
        </div>,
    },
  ];

  useEffect(() => {
    let tempHorizontalData = []
    let tempHorizontalLabels = []
    let tempTableData = []
    top10Data.map((value) => {
        tempHorizontalLabels.push(t(`RESULTS.${value.key}`))
        tempHorizontalData.push(value.n_pages)

        const level = aditionalData && aditionalData.practicesData.length > 0 && aditionalData.practicesData.find((elem) => elem.key === value.key)
        tempTableData.push({
          lvl: level.lvl,
          name: t(`RESULTS.${value.key}`),
          nPages: value.n_pages,
          nOccurrences: value.n_occurrences,
        })
    })
    setLabelsForHorizontal(tempHorizontalLabels)
    setDataForHorizontal(tempHorizontalData)
    setDataTable(tempTableData)

  }, [top10Data, language, theme])

  return (
    <div className="topTen_section tabs_section">
      <Tabs tabs={tabs} defaultActiveKey="tab1" vertical={false} />
    </div>
  );
}
