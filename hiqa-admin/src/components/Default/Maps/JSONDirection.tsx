import { useCallback } from 'react';

import { api } from '@/utils/axiosInterceptor';

export const useJSONDirection = () => {
  const getDirectionSteps = useCallback(async (origin: string, destination: string) => {
    const response = (await api(
      `/v1/api/getdirection-json/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`,
    )) as any;
    if (response?.status === 'OK') {
      return response;
    }
  }, []);

  const getLocationByLatLng = useCallback(async (latlng: string) => {
    const response = (await api(`/v1/api/getlocation-bylatlng-json`, 'POST', {
      data: {
        latlng,
      },
    })) as any;
    if (response?.status === 'OK') {
      return response;
    }
  }, []);

  const getDistancematrix = useCallback(async (origins: string, destinations: string) => {
    const response = (await api(`/v1/api/getdistance-by-distancematrix`, 'POST', {
      data: {
        origins: origins,
        destinations: destinations,
      },
    })) as any;
    if (response?.status === 'OK') {
      return response;
    }
  }, []);
  return { getDirectionSteps, getLocationByLatLng, getDistancematrix };
};
