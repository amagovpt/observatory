import type { TFunction } from 'i18next';
import type { Level } from '@/types';

export interface TopTenTableRow {
  lvl: Level;
  name: string;
  nPages: number;
  nOccurrences: number;
}

// Function to get data for Top Ten for each Good or Bad table
// t -> the translation
// theme -> Dark/Light theme
// labelsForHorizontal -> labels for the Horizontal Bar Graph
// dataForHorizontal -> data for the Horizontal Bar Graph
// color -> Background color for the Bar graph
// RETURNS
// dataHeaders -> Headers for Table
// columnsOptions -> Type of render for Table
// optionsHorizontalBar -> Options for Bar Graph
// horizontalData -> Data for Bar Graph
export function getTopTenGraphTable(
  t: TFunction,
  theme: string | undefined,
  labelsForHorizontal: string[] | undefined,
  dataForHorizontal: number[] | undefined,
  color: string,
) {
  const dataHeaders = [
    { type: 'Text', name: t('DIALOGS.errors.level'), justifyCenter: true },
    { type: 'Text', bigWidth: '50%', name: t('DIALOGS.errors.description') },
    { type: 'Text', name: t('DIALOGS.errors.pages'), justifyCenter: true },
    { type: 'Text', name: t('DIALOGS.errors.situations'), justifyCenter: true },
  ];

  const columnsOptions = {
    lvl: { type: 'Text', center: true, bold: false, decimalPlace: false, ariaLabel: true },
    name: { type: 'DangerousHTML', center: false, bold: false, decimalPlace: false },
    nPages: { type: 'Number', center: true, bold: false, decimalPlace: false },
    nOccurrences: { type: 'Number', center: true, bold: false, decimalPlace: false },
  };

  const optionsHorizontalBar = {
    indexAxis: 'y', // This makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t('DIALOGS.corrections.situations_label'),
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
          font: { size: 14 },
        },
        ticks: {
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on X axis
        },
        grid: {
          color: theme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)', // Color of Dividers vertically
        },
      },
      y: {
        title: {
          display: true,
          text: t('DIALOGS.corrections.tests_label'),
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
          font: { size: 14 },
        },
        ticks: {
          color: theme === 'light' ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on Y axis
          autoSkip: false,
          callback: function (_value: unknown, index: number) {
            // Fetch the label using the index
            const label = labelsForHorizontal?.[index] ?? '';
            return splitLabelForChart(label);
          },
        },
        grid: {
          color: theme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)', // Color of Dividers horizontaly
        },
      },
    },
  };

  const horizontalData = {
    labels: labelsForHorizontal,
    datasets: [
      {
        type: 'bar',
        label: t('DIALOGS.corrections.situations_label'),
        data: dataForHorizontal,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  return { dataHeaders, columnsOptions, optionsHorizontalBar, horizontalData };
}

function splitLabelForChart(label: string): string[] {
  const words = label.split(' ');
  const lineLimit = 85;
  const lines: string[] = [];

  let line = '';
  let currentWordIdx = 0;

  while (currentWordIdx < words.length) {
    if (line.length + words[currentWordIdx].length < lineLimit) {
      line += `${words[currentWordIdx]} `;
      currentWordIdx++;

      if (currentWordIdx === words.length) {
        lines.push(line);
      }
    } else {
      if (line.length) {
        lines.push(line);
        line = '';
      }

      if (words[currentWordIdx].length >= lineLimit) {
        lines.push(words[currentWordIdx]);
        currentWordIdx++;
      }
    }
  }

  return lines;
}
