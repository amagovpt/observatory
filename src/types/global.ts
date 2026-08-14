import { ComplianceMetrics, BadgeMetrics } from './common';
import { WebsiteRank } from './directory'; 
import { AuditItemDirectory } from './metrics';

export interface DeclarationSummary {
  total: ComplianceMetrics;
  currentYear: ComplianceMetrics;
}

export interface BadgeSummary {
  total: BadgeMetrics;
  currentYear: BadgeMetrics;
}

export interface GlobalStatistics {
  score: number;
  directoriesCount: number;
  websitesCount: number;
  entitiesCount: number;
  pagesCount: number;
  pagesWithoutErrorsCount: number;
  recentPageDate: string; 
  oldestPageDate: string;
  topWebsites: WebsiteRank[];
  topBestPractices: AuditItemDirectory[];
  topErrors: AuditItemDirectory[];
  declarations: DeclarationSummary;
  badges: BadgeSummary;
}