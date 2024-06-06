
// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Extra Data / Functions
import { getRadarGraph } from "../utils"

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

  const { options } = getRadarGraph(t, theme, tempData.accessibilityPlotData)

  useEffect(() => {
    let labelsForRadar = []
    tempData.accessibilityPlotData.map((value) => {
      labelsForRadar.push("")
    })

    const { manchaData } = getRadarGraph(t, theme, labelsForRadar, tempData.accessibilityPlotData)
    setDataForRadar(manchaData)

  }, [tempData, language, theme])

  return (
    <>
        {dataForRadar && <Radar data={dataForRadar} options={options} aria-label={t("WEBSITE.accessibility_plot.label")} />}
    </>
  );
}
