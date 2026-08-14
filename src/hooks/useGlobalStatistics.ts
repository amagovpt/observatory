import { useQuery } from '@tanstack/react-query';

import { observatoryService } from '../api/observatory.service';

const useAPIState = import.meta.env.VITE_API_DATA_SOURCE === 'remote';
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useGlobalStatistics = () => {
  return useQuery({
    queryKey: ['observatory', 'global-statistics', useAPIState],
    queryFn: observatoryService.getGlobalStatistics,
    staleTime: STALE_TIME,
  });
};