import { useQuery } from '@tanstack/react-query';

import { observatoryService } from '../api/observatory.service';

const useAPIState = import.meta.env.VITE_API_DATA_SOURCE === 'remote';
const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useDirectoryWebsites = (directoryId: number) => {
  return useQuery({
    queryKey: ['observatory', 'directories', directoryId, 'websites', useAPIState],
    queryFn: () => observatoryService.getDirectoryWebsites(directoryId),
    enabled: Boolean(directoryId),
    staleTime: STALE_TIME,
  });
};