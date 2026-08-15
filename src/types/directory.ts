import { StatsContainer, GraphDataEntry, TableDataEntry } from './metrics';

export interface DirectorySummary {
  id: number;
  rank: number;
  name: string;
  declarations: number;
  stamps: number;
  score: number;
  websites: number;
  A: number;
  AA: number;
  AAA: number;
}

export interface DirectoryDetails {
  id: number;
  name: string;
  oldestPageDate: string;
  recentPageDate: string;
  score: number;
  entitiesCount: number;
  websitesCount: number;
  pagesCount: number;
  scoreDistributionFrequency: number[];
  errorDistribution: StatsContainer;
  graphData: GraphDataEntry[];
  showTableData: TableDataEntry[];
}

export interface DirectoriesStats {
  score: number;
  directoriesCount: number;
  websitesCount: number;
  entitiesCount: number;
  pagesCount: number;
  recentPageDate: string; 
  oldestPageDate: string;
}

export interface WebsiteRank {
  index: number;
  id: number;
  directoryId: number;
  entity: string;
  name: string;
  score: number;
}