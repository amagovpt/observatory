import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/context/ThemeContext';
import { Tabs, SortingTable } from 'ama-design-system';
import type { AuditItemWebsite, DetailedDataTable } from '@/types';

import { getTopTenGraphTable, type TopTenTableRow } from './topTenTabs.utils';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopTenTabsProps {
  top10Data: AuditItemWebsite[];
  color: string;
  aditionalData: DetailedDataTable;
  title: string;
  ariaLabels: Record<string, string>;
}

export function TopTenTabs({ top10Data, color, aditionalData, title, ariaLabels }: TopTenTabsProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { theme } = useContext(ThemeContext)!;

  const [dataForHorizontal, setDataForHorizontal] = useState<number[]>();
  const [labelsForHorizontal, setLabelsForHorizontal] = useState<string[]>();
  const [dataTable, setDataTable] = useState<TopTenTableRow[]>();

  const { dataHeaders, columnsOptions, optionsHorizontalBar, horizontalData } = getTopTenGraphTable(t, theme, labelsForHorizontal, dataForHorizontal, color);

  const tabs = [
    {
      eventKey: 'tab5',
      title: t('DIALOGS.scores.chart_title'),
      component: (
        <div className="overflow">
          <div className="barLineContainer">
            <Bar data={horizontalData as unknown as ChartData<'bar'>} options={optionsHorizontalBar as unknown as ChartOptions<'bar'>} aria-label={title} />
          </div>
        </div>
      ),
    },
    {
      eventKey: 'tab6',
      title: t('DIALOGS.scores.table'),
      component: (
        <div className="dark_table">
          {dataTable && dataTable.length > 0 ? (
            <SortingTable
              hasSort={false}
              headers={dataHeaders}
              dataList={dataTable}
              columnsOptions={columnsOptions}
              darkTheme={theme}
              pagination={false}
              links={false}
              caption={title}
              ariaLabels={ariaLabels}
            />
          ) : (
            <p className="ama-typography-body-large mb-3">{t('WEBSITE.empty_table')}</p>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const tempHorizontalData: number[] = [];
    const tempHorizontalLabels: string[] = [];
    const tempTableData: TopTenTableRow[] = [];

    top10Data.forEach((value) => {
      tempHorizontalLabels.push(t(`TESTS_RESULTS.${value.key}.title`));
      tempHorizontalData.push(value.pagesCount);

      const practice = aditionalData.data.find((elem) => elem.key === value.key);
      if (!practice) return;

      tempTableData.push({
        lvl: practice.level,
        name: t(`TESTS_RESULTS.${value.key}.title`),
        nPages: value.pagesCount,
        nOccurrences: value.occurrenceCount,
      });
    });

    setLabelsForHorizontal(tempHorizontalLabels);
    setDataForHorizontal(tempHorizontalData);
    setDataTable(tempTableData);
  }, [top10Data, language, theme]);

  return (
    <div className="topTen_section tabs_section">
      <Tabs tabs={tabs} defaultActiveKey="tab5" vertical={false} />
    </div>
  );
}
