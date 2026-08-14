import { useTranslation } from 'react-i18next';
import { SortingTable, type ColumnOption, type TableHeader } from 'ama-design-system';
import type { Level } from '@/types';
import type { LevelPracticeRow } from './goodBadTab.utils';

interface LevelPracticesTableProps {
  level: Level;
  headers: TableHeader[];
  data: LevelPracticeRow[] | undefined;
  columnsOptions: Record<string, ColumnOption<LevelPracticeRow>>;
  theme?: string;
  goodOrBad: string;
}

export function LevelPracticesTable({ level, headers, data, columnsOptions, theme, goodOrBad }: LevelPracticesTableProps) {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="mt-3 mb-2">{t('WEBSITE.table.lvl_label') + ': ' + level}</h3>
      {data && data.length > 0 ? (
        <SortingTable
          hasSort={false}
          headers={headers}
          dataList={data}
          columnsOptions={columnsOptions}
          darkTheme={theme}
          pagination={false}
          links={false}
          caption={t(`WEBSITE.${goodOrBad}.message`, { value: level })}
        />
      ) : (
        <p className="ama-typography-body-large mb-3">{t('WEBSITE.empty_table')}</p>
      )}
    </>
  );
}
