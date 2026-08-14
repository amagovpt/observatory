import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/context/ThemeContext';
import { SortingTable } from 'ama-design-system';
import type { AuditItemWebsite, DetailedDataTable, Level } from '@/types';

import { TopTenTabs } from './topTenTabs';
import { LevelPracticesTable } from './levelPracticesTable';
import { usePracticeReportData } from './usePracticeReportData';
import { getGoodBadTabTables } from './goodBadTab.utils';

interface GoodBadTabProps {
  main_content_website: string;
  tempData: DetailedDataTable;
  top10Data: AuditItemWebsite[];
  color: string;
  goodOrBad: string;
  title: string;
}

export function GoodBadTab({ main_content_website, tempData, top10Data, color, goodOrBad, title }: GoodBadTabProps) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext)!;

  const { practiceLevelHeaders, columnsOptionsAAs, detailsTableHeaders, columnsOptionsDetails, ariaLabels } = getGoodBadTabTables(t);
  const { levelGroups, detailsTable } = usePracticeReportData(tempData, goodOrBad, t);

  return (
    <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center`}>
      <div className="d-flex flex-column section_container best_practises p-3">
        <h2 className="bold py-3 m-0">{title}</h2>

        {/* Top Ten Practices Graph/Table */}
        <div className="tabs_section">
          <TopTenTabs top10Data={top10Data} color={color} aditionalData={tempData} title={title} ariaLabels={ariaLabels} />
        </div>

        {/* Tables for Practices, 3 per level and one general — one table per level key, dynamically */}
        <h2 className="bold mt-5">{t(`WEBSITE.${goodOrBad}.title`)}</h2>
        <p className="ama-typography-body-large mb-3">{t(`WEBSITE.${goodOrBad}.subtitle`)}</p>
        <div className="light_tables">
          {Object.entries(levelGroups).map(([level, rows]) => (
            <LevelPracticesTable
              key={level}
              level={level as Level}
              headers={practiceLevelHeaders}
              data={rows}
              columnsOptions={columnsOptionsAAs}
              theme={theme}
              goodOrBad={goodOrBad}
            />
          ))}
        </div>

        <h2 className="bold mt-5 mb-3">{t(`WEBSITE.table.${goodOrBad}`)}</h2>
        {detailsTable.length > 0 ? (
          <SortingTable
            hasSort={false}
            headers={detailsTableHeaders}
            dataList={detailsTable}
            columnsOptions={columnsOptionsDetails}
            darkTheme={theme}
            pagination={false}
            links={false}
            caption={t(`WEBSITE.table.${goodOrBad}`)}
            ariaLabels={ariaLabels}
          />
        ) : (
          <p className="ama-typography-body-large mb-3">{t('WEBSITE.empty_table')}</p>
        )}
      </div>
    </section>
  );
}
