import React, { useContext, useCallback, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { api } from '@/utils/axiosInterceptor';
import settings from '@/settings.js';
import { toastr } from '@/utils/helpers';
import { useAlert } from './alert';
import { useCommonReducer } from './reducer';
// import { reducer, initialState } from './reducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}
interface VALIDATEZIPCODE {
  (postalCode: string, locality: string): Promise<boolean>;
}

interface COURSE {
  ():void
}
interface ALERT {
  toast: (title: string, icon: any) => void;
}
interface CONTEXTVALUE {
  state:any
  alert: ALERT;
  validateZipCode: VALIDATEZIPCODE;  
}

const AppContext = React.createContext<CONTEXTVALUE | null>(null);
export const AppProvider = ({ children }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: settings.googleAPIKey,
    libraries: ['places'],
  });
  const {state,dispatch} = useCommonReducer();
  const alert: ALERT = useAlert();

  const validateZipCode: VALIDATEZIPCODE = useCallback(
    async (postalCode, locality): Promise<boolean> => {
      try {
        if (isLoaded) {
          const geocode = new window.google.maps.Geocoder();
          if (geocode) {
            const geoLocation = await geocode.geocode({
              address: postalCode,
            });
            if (geoLocation) {
              if (geoLocation.results?.length) {
                const addressComponent = geoLocation.results[0].address_components;
                const addressLocality = addressComponent.filter((adr: { types: string | string[] }) =>
                  adr.types.includes('locality'),
                );
                if (addressLocality.length) {
                  if (addressLocality[0].long_name === locality) {
                    return true;
                  } else {
                    toastr("Postal Zipcode doesn't match with Locality City", 'warning');
                  }
                }
              }
            }
          }
          return false;
        } else return false;
      } catch (error: any) {
        if (error?.message) toastr(error.message, 'warning');
        return false;
      }
    },
    [isLoaded],
  );
  const getCourseList :COURSE = useCallback(async () => {
    try {
      const res: ReturnType<any> = await api(`${process.env.BACKEND_API_URL}home/course-list`, 'POST', {  });
      if (res.status) {
        const resData: any = res.data;
        dispatch({courseList:resData.courses_list,setting_data:resData.setting_data})        
      }return []
    } catch (error: any) {
        if (error?.message) toastr(error.message, 'warning');
        return false;
      }
  },[]);

  useEffect(() => {
    getCourseList()
  },[getCourseList])
  const value: CONTEXTVALUE = { state, alert, validateZipCode};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
export { useRequest } from './request';
export { useLoading } from './Loader';
export { useJSONDirection } from '../Default/Maps/JSONDirection';
export function useSettings() {
  return settings;
}
