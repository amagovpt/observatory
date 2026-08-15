import { useMemo } from 'react';
import type { TFunction } from 'i18next';
import type { DetailedDataTable, QuartileData, Level } from '@/types';

import type { DetailsPracticeRow, LevelPracticeRow } from './goodBadTab.utils';

// Domain closed set for the accessibility conformance levels — enumerated once
// here so every level always renders a table (even empty), instead of being
// re-declared per switch-case across components.
const ALL_LEVELS: Level[] = ['A', 'AA', 'AAA'];
const MAX_ROWS_PER_LEVEL = 3;

export interface PracticeReportData {
  levelGroups: Record<Level, LevelPracticeRow[]>;
  detailsTable: DetailsPracticeRow[];
}

function formatQuartileText(t: TFunction, quartile: QuartileData): string {
  const { lower, upper } = quartile.interval;
  if (lower === upper) {
    return quartile.percentage === 100
      ? t('WEBSITE.table.details.oneDetailAllPagesTogether', { lower })
      : t('WEBSITE.table.details.sameDetailTogether', { lower, nPages: quartile.total });
  }
  return t('WEBSITE.table.details.multiDetailsTogether', { lower, upper, nPages: quartile.total });
}

// Custom hook to compute the derived data structures rendered by GoodBadTab
// from the canonical DetailedDataTable (api-data-v2.ts) — isolates quartile
// parsing and level grouping from the presentation component.
// tempData -> successDetailsTable or errorsDetailsTable from WebsiteAuditReport
// goodOrBad -> i18n namespace segment ("top_3_best_practices" | "top_3_bad_practices")
// t -> the translation function
// RETURNS
// levelGroups -> top 3 practices per level (A/AA/AAA), dynamically grouped by `level`
// detailsTable -> every practice, formatted for the full details table
export function usePracticeReportData(tempData: DetailedDataTable, goodOrBad: string, t: TFunction): PracticeReportData {
  return useMemo(() => {
    const levelGroups = ALL_LEVELS.reduce((acc, level) => {
      acc[level] = [];
      return acc;
    }, {} as Record<Level, LevelPracticeRow[]>);

    const detailsTable: DetailsPracticeRow[] = tempData.data.map((practice) => {
      const name = t(`TESTS_RESULTS.${practice.key}.title`);

      const rows = levelGroups[practice.level];
      if (rows.length < MAX_ROWS_PER_LEVEL) {
        rows.push({
          number: `${rows.length + 1}.`,
          name,
          nPages: [`${t(`WEBSITE.${goodOrBad}.practice`)} `, `${practice.pageCount} ${t(`WEBSITE.${goodOrBad}.pages`)}`],
        });
      }

      return {
        name,
        practices: practice.quartiles.map((quartile) => formatQuartileText(t, quartile)),
        pages: practice.pageCount,
        occurences: practice.occurrenceCount,
        lvl: practice.level,
      };
    });

    return { levelGroups, detailsTable };
  }, [tempData, goodOrBad, t]);
}
