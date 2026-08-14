import type { TFunction } from 'i18next';
import type { Level } from '@/types';

// Function to get data for GoodBad General Tables
// t -> the translation
// RETURNS
// practiceLevelHeaders -> Headers shared by every per-level table (A/AA/AAA render the same columns)
// columnsOptionsAAs -> Type of render to execute p/ attribute
// detailsTableHeaders -> Headers for the table of all practice
// columnsOptionsDetails -> Type of render to execute p/ attribute
export function getGoodBadTabTables(t: TFunction) {
  const practiceLevelHeaders = [
    { type: 'Text', name: 'Nº', justifyCenter: true },
    { type: 'Text', name: t('DIALOGS.table.description'), justifyCenter: false },
    { type: 'Text', name: t('WEBSITE.table.n_errors_label'), justifyCenter: true },
  ];

  const columnsOptionsAAs = {
    number: { type: 'Text', center: true, bold: true, decimalPlace: false },
    name: { type: 'DangerousHTML', center: false, bold: false, decimalPlace: false },
    nPages: { type: 'DoubleText', center: true, bold: false, decimalPlace: false },
  };

  const detailsTableHeaders = [
    { type: 'Text', bigWidth: '50%', name: t('WEBSITE.table.practice_label') },
    { type: 'Text', bigWidth: '30%', name: t('WEBSITE.table.details_practice_label'), justifyCenter: true },
    { type: 'Text', name: t('WEBSITE.table.n_pages_label'), justifyCenter: true },
    { type: 'Text', name: t('WEBSITE.table.n_errors_label'), justifyCenter: true },
    { type: 'Text', name: t('WEBSITE.table.lvl_label'), justifyCenter: true },
  ];

  const columnsOptionsDetails = {
    name: { type: 'DangerousHTML', center: false, bold: false, decimalPlace: false },
    practices: { type: 'MultiText', center: true, bold: false, decimalPlace: false },
    pages: { type: 'Number', center: true, bold: false, decimalPlace: false },
    occurences: { type: 'Number', center: true, bold: false, decimalPlace: false },
    lvl: { type: 'Text', center: true, bold: false, decimalPlace: false, ariaLabel: true },
  };

  const ariaLabels = {
    A: t('WEBSITE.ariaLabels.A'),
    AA: t('WEBSITE.ariaLabels.AA'),
    AAA: t('WEBSITE.ariaLabels.AAA'),
  };

  return { practiceLevelHeaders, columnsOptionsAAs, detailsTableHeaders, columnsOptionsDetails, ariaLabels };
}

export interface LevelPracticeRow {
  number: string;
  name: string;
  nPages: [string, string];
}

export interface DetailsPracticeRow {
  name: string;
  practices: string[];
  pages: number;
  occurences: number;
  lvl: Level;
}
