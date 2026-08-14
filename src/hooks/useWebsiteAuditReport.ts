import { useQuery } from '@tanstack/react-query';

import { observatoryService } from '../api/observatory.service';

const useAPIState = import.meta.env.VITE_API_DATA_SOURCE === 'remote';
const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useWebsiteAuditReport = (websiteId: number) => {
  return useQuery({
    queryKey: ['observatory', 'websites', websiteId, 'audit', useAPIState],
    queryFn: () => observatoryService.getWebsiteAuditReport(websiteId),
    enabled: Boolean(websiteId),
    staleTime: STALE_TIME,
  });
};