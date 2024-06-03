import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { useTranslation } from "react-i18next";

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

  const options = {
    scales: {
      r: {
          min: 0,
          max: 10,
          grid: {
            color: theme === "light" ? "lightgrey" : 'lightgrey', // Color of the grid lines
          },
          angleLines: {
            color: theme === "light" ? "lightgrey" : 'lightgrey', // Color of the angle lines
          },
          ticks: {
            backdropColor: theme === "light" ? "transparent" : '#2c3241', // Background color for the tick labels
            color: theme === "light" ? "black" : 'white', // Color of the tick labels
          },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme === "light" ? "black" : '#b6dcf6', // Color of the legend text
        }
      }
    }
  }

  useEffect(() => {
    let labelsForRadar = []
    tempData.accessibilityPlotData.map((value) => {
      labelsForRadar.push("")
    })

    const manchaData = {
      labels: labelsForRadar,
      datasets: [
        {
          label: t("WEBSITE.accessibility_plot.label"),
          data: tempData.accessibilityPlotData,
          backgroundColor: theme === "light" ? 'rgba(255, 99, 132, 0.2)' : 'rgba(182, 220, 246, 0.2)',
          borderColor: theme === "light" ? 'rgba(255, 99, 132, 1)' : '#b6dcf6' ,
          borderWidth: 1,
        },
      ],
    };
    setDataForRadar(manchaData)

  }, [tempData, language, theme])

  return (
    <>
        {dataForRadar && <Radar data={dataForRadar} options={options} />}
    </>
  );
}
