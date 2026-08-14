import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/context/ThemeContext';
import { Tabs, SortingTable } from 'ama-design-system';

import { getBarLineGraph, getBarLineTable, type BarLineTableRow } from './barLineGraphTabs.utils';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, registerables as registerablesJS } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerablesJS);
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Title);

interface BarLineGraphTabsProps {
  scoreDistributionFrequency: number[];
  pageCount: number;
}

export function BarLineGraphTabs({ scoreDistributionFrequency, pageCount }: BarLineGraphTabsProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { theme } = useContext(ThemeContext)!;

  // Data for "Distribuição de pontuações" tabs
  const [dataTable, setDataTable] = useState<BarLineTableRow[]>();
  const [dataForBar, setDataForBar] = useState<string[]>();
  const [dataForLine, setDataForLine] = useState<string[]>();

  // Bar/Line
  const { headersBarLine, dataBarLine, optionsBarLine } = getBarLineGraph(t, dataForLine, dataForBar, pageCount, theme);
  const { dataHeaders, columnsOptions } = getBarLineTable(t);

  const tabs = [
    {
      eventKey: 'tab7',
      title: t('DIALOGS.scores.chart_title'),
      component: (
        <div className="overflow">
          <div className="barLineContainer">
            <Bar data={dataBarLine as unknown as ChartData<'bar'>} options={optionsBarLine as unknown as ChartOptions<'bar'>} aria-label={t('DIALOGS.scores.title')} />
          </div>
        </div>
      ),
    },
    {
      eventKey: 'tab8',
      title: t('DIALOGS.scores.table'),
      component: (
        <div>
          <SortingTable
            hasSort={false}
            headers={dataHeaders}
            dataList={dataTable}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t('DIALOGS.scores.title')}
            columnsOptions={columnsOptions}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const tempDataForBar: string[] = [];
    const tempDataForLine: string[] = [];
    const dataTableFrequency: BarLineTableRow[] = [];

    if (scoreDistributionFrequency.length > 0) {
      scoreDistributionFrequency.forEach((value, index) => {
        const percentage = ((value * 100) / pageCount).toFixed(1);
        tempDataForBar.push(percentage);

        let cumulative = 0;
        let cumulativePercent = percentage;
        if (index === 0) {
          cumulative = value;
        } else {
          const sum = value + dataTableFrequency[index - 1].cumulative;
          cumulative = sum;
          cumulativePercent = ((sum * 100) / pageCount).toFixed(1);
        }
        tempDataForLine.push(cumulativePercent);

        dataTableFrequency.push({
          range: headersBarLine[index],
          frequency: value,
          frequency_percent: percentage + '%',
          cumulative: cumulative,
          cumulative_percent: cumulativePercent + '%',
        });
      });
    }

    setDataForBar(tempDataForBar);
    setDataForLine(tempDataForLine);
    setDataTable(dataTableFrequency);
  }, [scoreDistributionFrequency, pageCount, language, theme]);

  return (
    <div className="BarLine_section tabs_section">
      <Tabs tabs={tabs} defaultActiveKey="tab7" vertical={false} />
    </div>
  );
}
