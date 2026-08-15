import type { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import type { ColumnOption, TableHeader } from 'ama-design-system';
import { pathURL } from '@/App';

/** Row shape shared by the `children` link renderers below. */
interface LinkRow {
  id: number;
  directoryId?: number;
}

export interface DirectoriesTableConfig {
  searchTableHeaders: TableHeader[];
  columnsOptionsSearch: Record<string, ColumnOption<LinkRow>>;
  directoriesHeaders: TableHeader[][];
  columnsOptions: Record<string, ColumnOption<LinkRow>>;
  statsTitles: string[];
  nameOfIcons: string[];
  ariaLabels: Record<string, string>;
}

// Function to get additional Arrays
// t -> the translation function
// RETURNS
// searchTableHeaders -> Headers for the search table
// columnsOptionsSearch -> Options to tell the type to render with which property for search table
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoriesTable(t: TFunction): DirectoriesTableConfig {
  const searchTableHeaders: TableHeader[] = [
    { type: 'SortingText', bigWidth: '40%', name: t('DIRECTORIES.search.directory'), property: 'directoryName' },
    { type: 'SortingText', bigWidth: '40%', name: t('DIRECTORIES.search.website'), property: 'name' },
    { type: 'SortingIcon', name: 'AMA-DeclaracaoDark-Line', description: t('DIRECTORIES.table.declaration'), property: 'declaration' },
    { type: 'SortingIcon', name: 'AMA-SeloDark-Line', description: t('DIRECTORIES.table.stamp'), property: 'stamp' },
    { type: 'SortingText', bigWidth: '10%', name: t('DIRECTORIES.search.score'), property: 'score', justifyCenter: true },
    { type: 'SortingText', bigWidth: '10%', name: t('DIRECTORIES.search.n_pages'), property: 'nPages', justifyCenter: true },
  ];

  const columnsOptionsSearch: Record<string, ColumnOption<LinkRow>> = {
    directoryName: {
      type: 'Link',
      center: false,
      bold: false,
      decimalPlace: false,
      children: (row, data) => (
        <Link to={`${pathURL}/directories/${row.directoryId}`} className="ama-typography-action-large bold">
          {String(data)}
        </Link>
      ),
    },
    directoryId: { type: 'Skip', center: false, bold: false, decimalPlace: false },
    name: {
      type: 'Link',
      center: false,
      bold: false,
      decimalPlace: false,
      children: (row, data) => (
        <Link to={`${pathURL}/directories/${row.directoryId}/${row.id}`} className="ama-typography-action-large bold">
          {String(data)}
        </Link>
      ),
    },
    id: { type: 'Skip', center: false, bold: false, decimalPlace: false },
    declaration: { type: 'Declaration', center: true, bold: false, decimalPlace: false },
    stamp: { type: 'Stamp', center: true, bold: false, decimalPlace: false },
    score: { type: 'Number', center: true, bold: false, decimalPlace: true },
    nPages: { type: 'Number', center: true, bold: false, decimalPlace: false },
  };

  const directoriesHeaders: TableHeader[][] = [
    [
      { type: 'SortingText', nRow: 2, bigWidth: '10%', name: t('DIRECTORIES.table.rank'), property: 'rank' },
      { type: 'SortingText', nRow: 2, bigWidth: '50%', name: t('DIRECTORIES.table.name'), property: 'name' },
      { type: 'SortingIcon', nRow: 2, name: 'AMA-DeclaracaoDark-Line', description: t('DIRECTORY.table.declaration'), property: 'declarations' },
      { type: 'SortingIcon', nRow: 2, name: 'AMA-SeloDark-Line', description: t('DIRECTORY.table.stamp'), property: 'stamps' },
      { type: 'SortingText', nRow: 2, bigWidth: '10%', name: t('DIRECTORIES.table.score'), property: 'score', justifyCenter: true },
      { type: 'SortingText', nRow: 2, bigWidth: '10%', name: t('DIRECTORIES.table.websites'), property: 'websites', justifyCenter: true },
      { id: 'conformidade', type: 'Text', nRow: 1, name: t('DIRECTORIES.table.levels'), property: '', justifyCenter: true, nCol: 3 },
    ],
    [
      { id: 'A', type: 'SortingText', bigWidth: '10%', name: t('DIRECTORIES.table.A'), property: 'A', justifyCenter: true, ariaLabel: true },
      { id: 'AA', type: 'SortingText', bigWidth: '10%', name: t('DIRECTORIES.table.AA'), property: 'AA', justifyCenter: true, ariaLabel: true },
      { id: 'AAA', type: 'SortingText', bigWidth: '10%', name: t('DIRECTORIES.table.AAA'), property: 'AAA', justifyCenter: true, ariaLabel: true },
    ],
  ];

  const columnsOptions: Record<string, ColumnOption<LinkRow>> = {
    id: { type: 'Skip', center: false, bold: false, decimalPlace: false },
    rank: { type: 'Number', center: true, bold: false, decimalPlace: false },
    name: {
      type: 'Link',
      center: false,
      bold: false,
      decimalPlace: false,
      children: (row, data) => (
        <Link to={`${pathURL}/directories/${row.id}`} className="ama-typography-action-large bold">
          {String(data)}
        </Link>
      ),
    },
    declarations: { type: 'Number', center: true, bold: false, decimalPlace: false },
    stamps: { type: 'Number', center: true, bold: false, decimalPlace: false },
    score: { type: 'Number', center: true, bold: false, decimalPlace: true },
    websites: { type: 'Number', center: true, bold: false, decimalPlace: false },
    A: { type: 'Number', center: true, bold: false, decimalPlace: false, headers: 'conformidade A' },
    AA: { type: 'Number', center: true, bold: false, decimalPlace: false, headers: 'conformidade AA' },
    AAA: { type: 'Number', center: true, bold: false, decimalPlace: false, headers: 'conformidade AAA' },
  };

  const statsTitles = [t('STATISTICS.directories'), t('STATISTICS.entities'), t('STATISTICS.websites'), t('STATISTICS.pages')];

  const nameOfIcons = [
    t('DIRECTORY.table.stamp_bronze'),
    t('DIRECTORY.table.stamp_silver'),
    t('DIRECTORY.table.stamp_gold'),
    t('DIRECTORY.table.declaration_not_conform'),
    t('DIRECTORY.table.declaration_partial_conform'),
    t('DIRECTORY.table.declaration_conform'),
  ];

  const ariaLabels = {
    A: t('WEBSITE.ariaLabels.A'),
    AA: t('WEBSITE.ariaLabels.AA'),
    AAA: t('WEBSITE.ariaLabels.AAA'),
  };

  return { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons, ariaLabels };
}
