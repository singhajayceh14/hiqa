import React, { createContext, FC, useContext } from 'react';
import { useLoadScript } from '@react-google-maps/api';
// import { UseLoadScriptOptions } from '@react-google-maps/api/dist/useLoadScript';

export type GoogleMapsState = {
  isLoaded: boolean;
  loadError?: Error;
};

const GoogleMapsContext = createContext<GoogleMapsState>({ isLoaded: false });

export const GoogleMapsProvider: FC<any> = ({ children, ...loadScriptOptions }) => {
  const { isLoaded, loadError } = useLoadScript(loadScriptOptions);

  return <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>{children}</GoogleMapsContext.Provider>;
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);

let googleLoader: any = null;
export function loadGoogle() {
  if (googleLoader) return googleLoader;
  // if (typeof google === 'object' && typeof google.maps === 'object') {
  //   return;
  // }
  return (googleLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = () => resolve(window.google);
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAieBrtjSXRb9G4SYtxh0TL03MDwmyDgqA&libraries=geometry,drawing,places,geocode`;
    document.head.appendChild(script);
  }));
}

export const useLoadGoogleAPI = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAieBrtjSXRb9G4SYtxh0TL03MDwmyDgqA',
    libraries: ['geometry', 'drawing', 'places'],
  });
  return { isLoaded, loadError };
};
