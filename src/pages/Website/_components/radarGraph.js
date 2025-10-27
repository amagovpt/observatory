
// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

import { Tabs, SortingTable } from "ama-design-system";

// Extra Data / Functions
import { getRadarGraph, getRadarTable } from "../utils"

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
);

export function RadarGraph({ tempData }) {
  const { t, i18n: { language } } = useTranslation();
  const { theme } = useContext(ThemeContext);

  // Radar Graph
  const [dataForRadar, setDataForRadar] = useState();
  const [dataForTable, setDataForTable] = useState([]);
  const [options, setOptions] = useState();

  const { dataHeaders, columnsOptions } = getRadarTable(t)

  useEffect(() => {
    let dataForTable = []
    let labelsForRadar = []
    tempData.accessibilityPlotData.map((value, key) => {
      dataForTable.push({
        "id": key+1,
        "score": value,
      })
      labelsForRadar.push("")
      return ""
    })

    const { manchaData, options: radarOptions } = getRadarGraph(t, theme, labelsForRadar, tempData.accessibilityPlotData, language)
    setDataForRadar(manchaData)
    setDataForTable(dataForTable)
    setOptions(radarOptions)

  }, [tempData, language, theme, t])

  const tabs = [
      {
        eventKey: "tab3",
        title: t("DIALOGS.scores.chart_title"),
        component:
        <div className="radar_graph d-flex justify-content-center">
          {dataForRadar && <Radar data={dataForRadar} options={options} aria-label={t("WEBSITE.accessibility_plot.label")} />}
        </div>,
      },
      {
        eventKey: "tab4",
        title: t("DIALOGS.scores.table"),
        component: <div className="radar_graph_table">
          <SortingTable
            hasSort={false}
            headers={dataHeaders}
            dataList={dataForTable}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t("WEBSITE.accessibility_plot.title")}
            columnsOptions={columnsOptions}
          />
        </div>,
      },
    ];

  return (
    <div className="BarLine_section tabs_section">
      <Tabs tabs={tabs} title={t("WEBSITE.accessibility_plot.title")} defaultActiveKey="tab3" vertical={false} />
    </div>
  );
}
