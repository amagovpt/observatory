import { Theme } from '@/context/ThemeContext';
import type { TFunction } from 'i18next';

// Function to get data for Radar
// t -> the translation
// theme -> Dark/Light theme
// labelsForRadar -> labels for the radar
// data -> Data for the radar
// language -> Current language (pt or en)
// RETURNS
// options -> Options for the radar
// manchaData -> Data for radar
export function getRadarGraph(t: TFunction, theme: Theme | undefined, labelsForRadar: string[], data: number[], language = 'pt') {
  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        grid: {
          color: theme === 'light' ? 'lightgrey' : 'lightgrey', // Color of the grid lines
        },
        angleLines: {
          color: theme === 'light' ? 'lightgrey' : 'lightgrey', // Color of the angle lines
        },
        ticks: {
          backdropColor: theme === 'light' ? 'transparent' : '#2c3241', // Background color for the tick labels
          color: theme === 'light' ? 'black' : 'white', // Color of the tick labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme === 'light' ? 'black' : '#b6dcf6', // Color of the legend text
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: { dataIndex: number; parsed: { r: number } }) {
            const dataIndex = context.dataIndex;
            const value = context.parsed.r;
            const pageNumber = dataIndex + 1;
            if (language === 'pt') {
              return `Pagina: ${pageNumber}, Classificação: ${value}`;
            } else {
              return `Page: ${pageNumber}, Score: ${value}`;
            }
          },
        },
      },
    },
  };

  const manchaData = {
    labels: labelsForRadar,
    datasets: [
      {
        label: t('WEBSITE.accessibility_plot.label'),
        data: data,
        backgroundColor: theme === 'light' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(182, 220, 246, 0.2)',
        borderColor: theme === 'light' ? 'rgba(255, 99, 132, 1)' : '#b6dcf6',
        borderWidth: 1,
      },
    ],
  };

  return { options, manchaData };
}

export function getRadarTable(t: TFunction) {
  const dataHeaders = [
    { type: 'Text', name: t('WEBSITE.accessibility_plot.headerTable'), justifyCenter: true },
    { type: 'Text', name: t('STATISTICS.score'), justifyCenter: true },
  ];

  const columnsOptions = {
    id: { type: 'Number', center: true, bold: false, decimalPlace: false },
    score: { type: 'Number', center: true, bold: false, decimalPlace: true },
  };

  return { dataHeaders, columnsOptions };
}
