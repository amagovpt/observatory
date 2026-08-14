import type { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import type { ColumnOption, TableHeader } from 'ama-design-system';
import { pathURL } from '@/App';

interface LinkRow {
  id: number;
}

export interface DirectoryTableConfig {
  directoriesHeaders: TableHeader[][];
  columnsOptions: Record<string, ColumnOption<LinkRow>>;
  statsTitles: string[];
  nameOfIcons: string[];
  paginationButtonsTexts: string[];
  nItemsPerPageText: string[];
  itemsPaginationText: string[];
  ariaLabels: Record<string, string>;
}

// Function to get additional Arrays
// t -> the translation function
// id -> the directory id (used to build website links)
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable(t: TFunction, id: number | null): DirectoryTableConfig {
  const directoriesHeaders: TableHeader[][] = [
    [
      { type: 'SortingText', nRow: 2, bigWidth: '10%', name: t('DIRECTORY.table.rank'), property: 'rank' },
      { type: 'SortingText', nRow: 2, bigWidth: '50%', name: t('DIRECTORY.table.name'), property: 'name' },
      { type: 'SortingIcon', nRow: 2, name: 'AMA-DeclaracaoDark-Line', description: t('DIRECTORY.table.declaration'), property: 'declaration' },
      { type: 'SortingIcon', nRow: 2, name: 'AMA-SeloDark-Line', description: t('DIRECTORY.table.stamp'), property: 'stamp' },
      { type: 'SortingText', nRow: 2, bigWidth: '10%', name: t('DIRECTORY.table.score'), property: 'score', justifyCenter: true },
      { type: 'SortingText', nRow: 2, bigWidth: '10%', name: t('DIRECTORY.table.pages'), property: 'nPages', justifyCenter: true },
      { id: 'conformidade', type: 'Text', name: t('DIRECTORY.table.levels'), property: '', justifyCenter: true, multiCol: true, nCol: 3 },
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
        <Link to={`${pathURL}/directories/${id}/website/${row.id}`} className="ama-typography-action-large bold">
          {String(data)}
        </Link>
      ),
    },
    entity: { type: 'Skip', center: false, bold: false, decimalPlace: false },
    declaration: { type: 'Declaration', center: true, bold: false, decimalPlace: false },
    stamp: { type: 'Stamp', center: true, bold: false, decimalPlace: false },
    score: { type: 'Number', center: true, bold: false, decimalPlace: true },
    nPages: { type: 'Number', center: true, bold: false, decimalPlace: false },
    A: { type: 'Number', center: true, bold: false, decimalPlace: false, headers: 'conformidade A' },
    AA: { type: 'Number', center: true, bold: false, decimalPlace: false, headers: 'conformidade AA' },
    AAA: { type: 'Number', center: true, bold: false, decimalPlace: false, headers: 'conformidade AAA' },
  };

  const statsTitles = [t('STATISTICS.entities'), t('STATISTICS.websites'), t('STATISTICS.pages')];

  const nameOfIcons = [
    t('DIRECTORY.table.stamp_bronze'),
    t('DIRECTORY.table.stamp_silver'),
    t('DIRECTORY.table.stamp_gold'),
    t('DIRECTORY.table.declaration_not_conform'),
    t('DIRECTORY.table.declaration_partial_conform'),
    t('DIRECTORY.table.declaration_conform'),
  ];

  const paginationButtonsTexts = [
    t('DIRECTORY.table.paginator.first_page'),
    t('DIRECTORY.table.paginator.previous_page'),
    t('DIRECTORY.table.paginator.next_page'),
    t('DIRECTORY.table.paginator.last_page'),
  ];

  const nItemsPerPageText = [
    t('DIRECTORY.table.paginator.see'),
    t('DIRECTORY.table.paginator.per_page'),
    t('DIRECTORY.table.paginator.selectorAria'),
    t('DIRECTORY.table.paginator.selectorNav'),
  ];

  const itemsPaginationText = [t('DIRECTORY.table.paginator.of'), t('DIRECTORY.table.paginator.items')];

  const ariaLabels = {
    A: t('WEBSITE.ariaLabels.A'),
    AA: t('WEBSITE.ariaLabels.AA'),
    AAA: t('WEBSITE.ariaLabels.AAA'),
  };

  return {
    directoriesHeaders,
    columnsOptions,
    statsTitles,
    nameOfIcons,
    paginationButtonsTexts,
    nItemsPerPageText,
    itemsPaginationText,
    ariaLabels,
  };
}
