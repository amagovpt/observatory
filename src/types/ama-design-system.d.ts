declare module 'ama-design-system' {
  import type { ChangeEvent, ReactNode } from 'react';
  import type { StatisticsObject } from '@/utils/utils';

  export interface IconProps {
    name: string;
    'aria-hidden'?: boolean | 'true' | 'false';
  }
  export function Icon(props: IconProps): ReactNode;
export interface StatTitleObject {
  readonly subtitle: string;
  readonly subtitle2?: string;
}

export interface StatisticsData {
  readonly score: number;
  readonly oldestPage: string;
  readonly recentPage: string;
  readonly statsTable: readonly number[];
}

export interface StatisticsHeaderProps {
  readonly darkTheme: string;
  readonly stats: any;
  readonly statsTitles: readonly (string | StatTitleObject)[];
  readonly doubleRow?: boolean;
  readonly title: string;
  readonly subtitle: string;
  readonly oldestPage?: string;
  readonly newestPage?: string;
  readonly gaugeTitle?: string[];
  readonly gaugeDescription?: string;
  readonly gaugeType?: string;
  readonly buttons?: React.ReactNode;
  readonly showGauge?: boolean;
  readonly tag?: keyof JSX.IntrinsicElements;
}
  export function StatisticsHeader(props: StatisticsHeaderProps): ReactNode;

  export interface LoadingComponentProps {
    darkTheme?: string;
    loadingText: string;
  }
  export function LoadingComponent(props: LoadingComponentProps): ReactNode;

  export interface TableHeader {
    type: string;
    id?: string;
    name?: string;
    property?: string;
    bigWidth?: string;
    nRow?: number;
    nCol?: number;
    multiCol?: boolean;
    description?: string;
    justifyCenter?: boolean;
    ariaLabel?: boolean;
    headers?: string;
  }

  export interface ColumnOption<TRow = Record<string, unknown>> {
    type: string;
    center: boolean;
    bold: boolean;
    decimalPlace: boolean;
    children?: (row: TRow, data: unknown) => ReactNode;
    headers?: string;
  }

  export interface SortingTableProps<TRow = Record<string, unknown>> {
    darkTheme?: string;
    hasSort?: boolean;
    headers: TableHeader[] | TableHeader[][];
    setDataList?: (data: TRow[]) => void;
    dataList: TRow[] | undefined;
    caption: string;
    columnsOptions: Record<string, ColumnOption<TRow>>;
    pagination?: boolean;
    links?: boolean;
    ariaLabels?: Record<string, string>;
    iconsAltTexts?: string[];
    itemsPaginationTexts?: string[];
    nItemsPerPageTexts?: string[];
    paginationButtonsTexts?: string[];
  }
  export function SortingTable<TRow = Record<string, unknown>>(props: SortingTableProps<TRow>): ReactNode;

  export type BreadcrumbItem = { children: ReactNode; title?: undefined } | { title: string; children?: undefined };
  export interface BreadcrumbProps {
    data: BreadcrumbItem[];
    darkTheme?: string;
    tagHere: string;
  }
  export function Breadcrumb(props: BreadcrumbProps): ReactNode;

  export interface InputProps {
    darkTheme?: string;
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  export function Input(props: InputProps): ReactNode;

  export interface TabItem {
    eventKey: string;
    title: string;
    component: ReactNode;
  }
  export interface TabsProps {
    tabs: TabItem[];
    title?: string;
    defaultActiveKey?: string;
    vertical?: boolean;
    onSelect?: (key: string) => void;
    className?: string;
  }
  export function Tabs(props: TabsProps): ReactNode;

  export interface ButtonProps {
    darkTheme?: string;
    text: string;
    size?: string;
    id?: string;
    onClick?: () => void;
    iconRight?: ReactNode;
  }
  export function Button(props: ButtonProps): ReactNode;

  export interface HeaderProps {
    description: ReactNode;
    title: string;
    title2?: string;
    darkTheme?: string;
    homePage?: boolean;
    language: string;
    changeLanguage: () => void;
    changeTheme: () => void;
    linkTo: string;
    ariaLabel: string;
    obsSpecial?: boolean;
  }
  export function Header(props: HeaderProps): ReactNode;

  export interface FooterProps {
    darkTheme?: string;
  }
  export function Footer(props: FooterProps): ReactNode;
}
