import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { useTranslation } from "react-i18next";

import { Tabs } from "../../../components/index";
import { SortingTable } from "../../../components/Molecules/SortingTable";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TopTenTabs({ top10Data, color, aditionalData, title }) {

  const { t, i18n: { language } } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [dataForHorizontal, setDataForHorizontal] = useState();
  const [labelsForHorizontal, setLabelsForHorizontal] = useState();
  const [dataTable, setDataTable] = useState();

  const dataHeaders = [
    {icon: false, name: t("DIALOGS.errors.level")},
    {icon: false, bigWidth: "50%", name: t("DIALOGS.errors.description")},
    {icon: false, name: t("DIALOGS.errors.pages"), justifyCenter: true},
    {icon: false, name: t("DIALOGS.errors.situations"), justifyCenter: true}
  ]

  let columnsOptions = {
    lvl: { type: "Text", center: false, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
    nOccurrences: { type: "Number", center: true, bold: false, decimalPlace: false },
  }

  const optionsHorizontalBar = {
    indexAxis: 'y', // This makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t("DIALOGS.corrections.situations_label"),
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
          font: {
            size: 14
          }
        },
        ticks: {
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
        },
        grid: {
            color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
        }
      },
      y: {
        title: {
          display: true,
          text: t("DIALOGS.corrections.tests_label"),
          color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
          font: {
            size: 14
          }
        },
        ticks: {
            color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on Y axis
            callback: function (value, index) {
                // Fetch the label using the index
                const label = labelsForHorizontal[index];
                // Word-wrap the label into multiple lines
                const words = label.split(' ');
                const maxLength = 20; // Set the max length for each line
                let result = '';
                let line = '';
                words.forEach((word) => {
                    if (line.length + word.length < maxLength) {
                    line += word + ' ';
                    } else {
                    result += line.trim() + '\n';
                    line = word + ' ';
                    }
                });
                result += line.trim();
                return result;
            }
          },
        grid: {
            color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
        }
      }
    }
  };

  const horizontalData = {
    labels: labelsForHorizontal,
    datasets: [
      {
        type: 'bar',
        label: t("DIALOGS.corrections.situations_label"),
        data: dataForHorizontal,
        backgroundColor: color,
        borderWidth: 0,
      }
    ]
  };

  const tabs = [
    {
      eventKey: "tab1",
      title: t("DIALOGS.scores.chart_title"),
      component: <div className="barLineContainer"><Bar data={horizontalData} options={optionsHorizontalBar} /></div>,
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
          darkTheme={theme === "light" ? false : true}
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

        const level = aditionalData.practicesData.find((elem) => elem.key === value.key)
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
