import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/context/ThemeContext';
import { Tabs, SortingTable } from 'ama-design-system';

import { getRadarGraph, getRadarTable } from './radarGraph.utils';

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarGraphProps {
  accessibilityPlotData: number[];
}

interface RadarTableRow {
  id: number;
  score: number;
}

export function RadarGraph({ accessibilityPlotData }: RadarGraphProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { theme } = useContext(ThemeContext)!;

  const [dataForRadar, setDataForRadar] = useState<ReturnType<typeof getRadarGraph>['manchaData']>();
  const [dataForTable, setDataForTable] = useState<RadarTableRow[]>([]);
  const [options, setOptions] = useState<ReturnType<typeof getRadarGraph>['options']>();

  const { dataHeaders, columnsOptions } = getRadarTable(t);

  useEffect(() => {
    const dataForTable: RadarTableRow[] = [];
    const labelsForRadar: string[] = [];
    accessibilityPlotData.forEach((value, key) => {
      dataForTable.push({ id: key + 1, score: value });
      labelsForRadar.push('');
    });

    const { manchaData, options: radarOptions } = getRadarGraph(t, theme, labelsForRadar, accessibilityPlotData, language);
    setDataForRadar(manchaData);
    setDataForTable(dataForTable);
    setOptions(radarOptions);
  }, [accessibilityPlotData, language, theme, t]);

  const tabs = [
    {
      eventKey: 'tab3',
      title: t('DIALOGS.scores.chart_title'),
      component: (
        <div className="radar_graph d-flex justify-content-center">
          {dataForRadar && (
            <Radar
              data={dataForRadar as unknown as ChartData<'radar'>}
              options={options as unknown as ChartOptions<'radar'>}
              aria-label={t('WEBSITE.accessibility_plot.label')}
            />
          )}
        </div>
      ),
    },
    {
      eventKey: 'tab4',
      title: t('DIALOGS.scores.table'),
      component: (
        <div className="radar_graph_table">
          <SortingTable
            hasSort={false}
            headers={dataHeaders}
            dataList={dataForTable}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t('WEBSITE.accessibility_plot.title')}
            columnsOptions={columnsOptions}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="BarLine_section tabs_section">
      <Tabs tabs={tabs} title={t('WEBSITE.accessibility_plot.title')} defaultActiveKey="tab3" vertical={false} />
    </div>
  );
}
