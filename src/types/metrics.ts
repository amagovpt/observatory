import { Level, Result } from './common';
import { Quartile } from './stats';

export interface AuditItemDirectory {
  key: string;
  occurrenceCount: number;
  pagesCount: number;
  websitesCount: number;
}

export interface AuditItemWebsite {
  key: string;
  occurrenceCount: number;
  pagesCount: number;
}

export interface MetricOccurrence {
  occurrencesCount: number;
  pagesCount: number;
  websitesCount: number;
  tagsCount?: number;
}

export interface TableDataEntry {
  key: string;
  level: Level;
  element: string;
  websitesCount: number;
  pagesCount: number;
  elementsCount: number;
  quartiles: Quartile[];
  elementGroup?: string;
}

export interface GraphDataEntry {
  key: string;
  element: string;
  pagesCount: number;
  websitesCount: number;
  result: Result;
}

export interface StatsContainer {
  errors?: Record<string, MetricOccurrence>;
  success?: Record<string, MetricOccurrence>;
  graphData: GraphDataEntry[];
  showTableData: TableDataEntry[];
}

export interface AuditMetric {
  pageCount: number;
  occurrenceCount: number;
  element: string;
  testName: string;
  result: Result;
}

export interface QuartileData {
  total: number;
  percentage: number;
  interval: {
    lower: number;
    upper: number;
  };
}

export interface AuditPracticeDetail {
  key: string;
  occurrenceCount: number;
  pageCount: number;
  level: Level;
  quartiles: QuartileData[];
}

export interface DetailedDataTable {
  keys: string[];
  data: AuditPracticeDetail[];
}