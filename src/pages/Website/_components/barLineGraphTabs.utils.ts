import type { TFunction } from 'i18next';

export interface BarLineChartData {
  labels: string[];
  datasets: Array<Record<string, unknown>>;
}

export interface BarLineTableRow {
  range: string;
  frequency: number;
  frequency_percent: string;
  cumulative: number;
  cumulative_percent: string;
}

// Function to get data for Bar/Line Graph
// t -> the translation
// dataForLine -> data array for the line graph
// dataForBar -> data array for the bar graph
// pageCount -> total number of pages, used to turn tooltip percentages back into page counts
// theme -> dark / light theme
// RETURNS
// headersBarLine -> Bar graph X labels
// dataBarLine -> Bar & Line Data
// optionsBarLine -> Options to change the Bar & Line graph
export function getBarLineGraph(
  t: TFunction,
  dataForLine: string[] | undefined,
  dataForBar: string[] | undefined,
  pageCount: number,
  theme?: string,
) {
  const headersBarLine = ['[1 - 2[', '[2 - 3[', '[3 - 4[', '[4 - 5[', '[5 - 6[', '[6 - 7[', '[7 - 8[', '[8 - 9[', '[9 - 10['];

  const dataBarLine: BarLineChartData = {
    labels: headersBarLine,
    datasets: [
      {
        type: 'line',
        label: t('DIALOGS.scores.cumulative'),
        data: dataForLine,
        backgroundColor: 'rgba(51, 51, 153, 1)',
        borderColor: 'rgba(51, 51, 153, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0,
        pointBackgroundColor: 'red', // Set the color of the dots
        pointBorderColor: 'red', // Set the border color of the dots
      },
      {
        type: 'bar',
        label: t('DIALOGS.scores.frequency'),
        data: dataForBar,
        backgroundColor: ['#e90018', '#e90018', '#f38e10', '#f38e10', '#f3d609', '#f3d609', '#f3d609', '#15ac51', '#15ac51'],
        borderWidth: 0,
      },
    ],
  };

  const optionsBarLine = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: {
            dataset: { label?: string; type?: string };
            raw: number;
          }) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.type === 'bar') {
              // Format the tooltip for bar dataset
              const nPages = ((context.raw * pageCount) / 100).toFixed(0);
              return [`${label}${context.raw}%`, `${t('DIALOGS.scores.frequency')}: ${nPages}`];
            } else if (context.dataset.type === 'line') {
              // Format the tooltip for line dataset
              const nPages = ((context.raw * pageCount) / 100).toFixed(0);
              return [`${label}${context.raw}%`, `${t('DIALOGS.scores.percentage')}: ${nPages}`];
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t('DIALOGS.scores.range'),
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
          font: { size: 14 },
        },
        ticks: {
          font: { size: 14 },
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on X axis
        },
        grid: {
          color: theme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)', // Color of Dividers vertically
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: t('DIALOGS.scores.percentage_label'),
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
          font: { size: 14 },
        },
        ticks: {
          font: { size: 14 },
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on Y axis
        },
        grid: {
          color: theme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)', // Color of Dividers horizontaly
        },
      },
    },
  };

  return { headersBarLine, dataBarLine, optionsBarLine };
}

// Function to get data for Bar/Line Table
// t -> the translation
// RETURNS
// dataHeaders -> Bar/Line Table headers
// columnsOptions -> Bar/Line type of render to execute p/ attribute
export function getBarLineTable(t: TFunction) {
  const dataHeaders = [
    { type: 'Text', name: t('DIALOGS.scores.range'), justifyCenter: true },
    { type: 'Text', name: t('DIALOGS.scores.frequency'), justifyCenter: true },
    { type: 'Text', name: t('DIALOGS.scores.frequency') + ' (%)', justifyCenter: true },
    { type: 'Text', name: t('DIALOGS.scores.cumulative'), justifyCenter: true },
    { type: 'Text', name: t('DIALOGS.scores.cumulative') + ' (%)', justifyCenter: true },
  ];

  const columnsOptions = {
    range: { type: 'Text', center: true, bold: false, decimalPlace: false },
    frequency: { type: 'Number', center: true, bold: false, decimalPlace: false },
    frequency_percent: { type: 'Text', center: true, bold: false, decimalPlace: false },
    cumulative: { type: 'Number', center: true, bold: false, decimalPlace: false },
    cumulative_percent: { type: 'Text', center: true, bold: false, decimalPlace: false },
  };

  return { dataHeaders, columnsOptions };
}
