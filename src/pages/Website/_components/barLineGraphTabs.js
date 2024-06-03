import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/ThemeContext";

import { Tabs } from "../../../components/index";
import { SortingTable } from "../../../components/Molecules/SortingTable";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
  const { theme } = useContext(ThemeContext);

  // Data for "Distribuição de pontuações" tabs
  const [dataTable, setDataTable] = useState();
  const [dataForBar, setDataForBar] = useState();
  const [dataForLine, setDataForLine] = useState();
  

  const headersBarLine = ['[1 - 2[', '[2 - 3[', '[3 - 4[', '[4 - 5[', '[5 - 6[', '[6 - 7[', '[7 - 8[', '[8 - 9[', '[9 - 10[']

  const dataHeaders = [
    [
      {icon: false, name: t("DIALOGS.scores.range")},
      {icon: false, name: t("DIALOGS.scores.frequency"), justifyCenter: true},
      {icon: false, name: t("DIALOGS.scores.frequency")+ " (%)", justifyCenter: true},
      {icon: false, name: t("DIALOGS.scores.cumulative"), justifyCenter: true},
      {icon: false, name: t("DIALOGS.scores.cumulative")+ " (%)", justifyCenter: true},
    ]
  ]

  let columnsOptions = {
    range: { type: "Text", center: false, bold: false, decimalPlace: false },
    frequency: { type: "Number", center: true, bold: false, decimalPlace: false },
    frequency_percent: { type: "Text", center: true, bold: false, decimalPlace: false },
    cumulative: { type: "Number", center: true, bold: false, decimalPlace: false },
    cumulative_percent: { type: "Text", center: true, bold: false, decimalPlace: false },
  }

  const dataBarLine = {
    labels: headersBarLine,
    datasets: [
      {
        type: 'line',
        label: t("DIALOGS.scores.cumulative"),
        data: dataForLine,
        backgroundColor: 'rgba(51, 51, 153, 1)',
        borderColor: 'rgba(51, 51, 153, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0,
        pointBackgroundColor: 'red', // Set the color of the dots
        pointBorderColor: 'red',     // Set the border color of the dots
      },
      {
        type: 'bar',
        label: t("DIALOGS.scores.frequency"),
        data: dataForBar,
        backgroundColor: [
          '#e90018',
          '#e90018',
          '#f38e10',
          '#f38e10',
          '#f3d609',
          '#f3d609',
          '#f3d609',
          '#15ac51',
          '#15ac51' 
        ],
        borderWidth: 0,
      }
    ]
  };

  const optionsBarLine = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.type === 'bar') {
              // Format the tooltip for bar dataset
              const nPages = (context.raw*websiteStats.statsTable[0]/100).toFixed(0)
              return [
                `${label}${context.raw}%`,      // Main value
                `${t("DIALOGS.scores.frequency")}: ${nPages}` // Additional value
              ];
            } else if (context.dataset.type === 'line') {
              // Format the tooltip for line dataset
              const nPages = (context.raw*websiteStats.statsTable[0]/100).toFixed(0)
              return [
                `${label}${context.raw}%`,      // Main value
                `${t("DIALOGS.scores.percentage")}: ${nPages}` // Additional value
              ];
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("DIALOGS.scores.range"),
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
          font: {
            size: 14
          }
        },
        ticks: {
          font: {
            size: 14
          },
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
        },
        grid: {
          color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
        }
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: t("DIALOGS.scores.percentage_label"),
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
          font: {
            size: 14
          }
        },
        ticks: {
          font: {
            size: 14,
          },
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on Y axis
        },
        grid: {
          color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
        }
      }
    }
  };

  const tabs = [
    {
      eventKey: "tab1",
      title: t("DIALOGS.scores.chart_title"),
      component: <div className="barLineContainer"><Bar data={dataBarLine} options={optionsBarLine} /></div>,
    },
    {
      eventKey: "tab2",
      title: t("DIALOGS.scores.table"),
      component: <div>
        <SortingTable
          hasSort={false}
          headers={dataHeaders}
          dataList={dataTable}
          darkTheme={theme === "light" ? false : true}
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
    tempData.scoreDistributionFrequency.map((value, index) => {
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

      const headersBarLine = ['[1 - 2[', '[2 - 3[', '[3 - 4[', '[4 - 5[', '[5 - 6[', '[6 - 7[', '[7 - 8[', '[8 - 9[', '[9 - 10[']
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
    <div className="tabs_section">
      <Tabs tabs={tabs} defaultActiveKey="tab1" vertical={false} />
    </div>
  );
}
