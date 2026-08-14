
export type Result = 'passed' | 'failed';
export type Level = 'A' | 'AA' | 'AAA';

export interface ComplianceStatus {
  conform: number;
  partial: number;
  not_conform: number;
}

export interface ComplianceMetrics {
  websites: ComplianceStatus;
  apps: ComplianceStatus;
}

export interface BadgesCount {
  gold: number;
  silver: number;
  bronze: number;
}

export interface BadgeMetrics {
  websites: BadgesCount;
  apps: BadgesCount;
}