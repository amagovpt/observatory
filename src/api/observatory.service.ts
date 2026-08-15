import { api } from './client';
import dataJSON from '@/utils/data.json';
import type { 
  DirectoriesStats, 
  DirectoryDetails, 
  DirectorySummary, 
  GlobalStatistics, 
  WebsiteAuditReport, 
  WebsiteRankingDetailed 
} from '@/types';

const useAPI = import.meta.env.VITE_API_DATA_SOURCE === 'remote';

export interface ObservatoryApiResponse<T> {
  timestamp: string;
  data: T;
}

export const observatoryService = {
  async getGlobalStatistics(): Promise<GlobalStatistics> {
    if (!useAPI) {
      return dataJSON as unknown as GlobalStatistics;
    }
    const { data } = await api.get<ObservatoryApiResponse<GlobalStatistics>>('/observatory');
    return data.data;
  },

  async getDirectoriesRank(): Promise<DirectorySummary[]> {
    if (!useAPI) {
      return dataJSON as unknown as DirectorySummary[];
    }
    const { data } = await api.get<ObservatoryApiResponse<DirectorySummary[]>>('/observatory/directories/ranks');
    return data.data;
  },

  async getDirectoriesStatistics(): Promise<DirectoriesStats> {
    if (!useAPI) {
      throw new Error('Local fallback not implemented for directories statistics');
    }
    const { data } = await api.get<ObservatoryApiResponse<DirectoriesStats>>('/observatory/directories/statistics');
    return data.data;
  },

  async getDirectoryStatistics(directoryId: number): Promise<DirectoriesStats> {
    if (!useAPI) {
      throw new Error(`Local fallback not implemented for directory statistics ID: ${directoryId}`);
    }
    const { data } = await api.get<ObservatoryApiResponse<DirectoriesStats>>(`/observatory/directories/${directoryId}/statistics`);
    return data.data;
  },

  async getDirectoryDetails(directoryId: number): Promise<DirectoryDetails> {
    if (!useAPI) {
      throw new Error(`Local fallback not implemented for directory details ID: ${directoryId}`);
    }
    const { data } = await api.get<ObservatoryApiResponse<DirectoryDetails>>(`/observatory/directories/${directoryId}`);
    return data.data;
  },

  async getDirectoryWebsites(directoryId: number): Promise<WebsiteRankingDetailed[]> {
    if (!useAPI) {
      throw new Error(`Local fallback not implemented for directory websites ID: ${directoryId}`);
    }
    const { data } = await api.get<ObservatoryApiResponse<WebsiteRankingDetailed[]>>(`/observatory/directories/${directoryId}/websites`);
    return data.data;
  },

  async getWebsiteAuditReport(websiteId: number): Promise<WebsiteAuditReport> {
    if (!useAPI) {
      throw new Error(`Local fallback not implemented for website audit ID: ${websiteId}`);
    }
    const { data } = await api.get<ObservatoryApiResponse<WebsiteAuditReport>>(`/observatory/websites/${websiteId}`);
    return data.data;
  },
};