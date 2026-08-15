import { AuditItemWebsite, StatsContainer, AuditMetric, DetailedDataTable } from './metrics';

export interface WebsiteRankingDetailed {
  id: number;
  rank: number;
  name: string;
  entity: string;
  declaration: number | null;
  stamp: number | null;
  score: number;
  nPages: number;
  A: number;
  AA: number;
  AAA: number;
}

export interface WebsiteDetails {
  id: number;
  name: string;
  url: string;
  oldestPageDate: string;
  recentPageDate: string;
  score: number;
  pagesCount: number;
  institution: string;
  pageWithErrorsCount: number;
  pagesWithoutErrorsA: number;
  pagesWithoutErrorsAA: number;
  pagesWithoutErrorsAAA: number;
  pagesWithoutErrors: number;
  accessibilityPlotData: number[];
  scoreDistributionFrequency: number[];
  errorsDistribution: AuditItemWebsite;
  bestPracticesDistribution: AuditItemWebsite;
  errors: StatsContainer;
}

export interface WebsiteAuditReport {
  id: number;
  name: string;
  url: string;
  oldestPageDate: string;
  recentPageDate: string;
  score: number;
  pageCount: number;
  institutionName: string;
  pagesWithErrorsCount: number;
  pagesWithoutErrorsA: number;
  pagesWithoutErrorsAA: number;
  pagesWithoutErrorsAAA: number;
  pagesWithoutErrorsCount: number;
  accessibilityPlotData: number[];
  scoreDistributionFrequency: number[];
  errorsDistribution: AuditItemWebsite[]; 
  bestPracticesDistribution: AuditItemWebsite[];
  errorMetrics: Record<string, AuditMetric>;
  successMetrics: Record<string, AuditMetric>;
  successDetailsTable: DetailedDataTable;
  errorsDetailsTable: DetailedDataTable;
}