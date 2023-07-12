import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { useSettings } from '@/components/App';

interface POSITION {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  locationType?: string;
  location: LOCATION;
  integration?: string;
}
interface LOCATION {
  lat: number;
  lng: number;
}
interface PROPS {
  width?: string;
  height?: string;
  positions: POSITION[];
}
// interface MAPS {
//   center: LOCATION;
//   positions: POSITION[];
//   zoom: number;
// }
type Libraries = ('places' | 'geometry' | 'drawing' | 'localContext' | 'visualization')[];
function Index(props: PROPS) {
  const settings = useSettings();
  const [libraries] = useState(['places'] as Libraries);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: settings.googleAPIKey,
    libraries: libraries,
  });
  const [center, setcenter] = useState({ lat: 45.5593046, lng: -73.8766791 });
  const [map, setMap] = useState(null) as any;
  const googleMarker = useRef<google.maps.Marker[]>([]);
  const googleInfoWindow = useRef<google.maps.InfoWindow[]>([]);
  const containerStyle = {
    width: '100%',
    height: '500px',
  };
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  function showPosition(position: { coords: { latitude: number; longitude: number } }) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setcenter({ lat, lng });
  }
  function clearMarkers() {
    if (googleMarker?.current)
      for (const mark of googleMarker.current) {
        mark.setMap(null);
      }
  }
  function hideInfoWindows() {
    if (googleInfoWindow?.current)
      for (const mark of googleInfoWindow.current) {
        mark.close();
      }
  }
  useEffect(() => {
    clearMarkers();
    if (map) {
      if (props.positions && props.positions) {
        const bounds = new window.google.maps.LatLngBounds();
        props.positions.map((pos: POSITION) => {
          const infowindow = new google.maps.InfoWindow({
            content:
              pos.email && pos.phone && pos.name
                ? `<div>
                <p>Name  - ${pos.name}</p>
                <p>Email - ${pos.email}</p>
                <p>Phone - ${pos.phone}</p>
                ${pos.locationType ? `<p>Route - ${pos.locationType}</p>` : ''}
                ${pos?.integration ? `<p>Integration - ${pos.integration}</p>` : ''}
              </div>`
                : `
              <div>
                <p>Name  - ${pos.name}</p>
                ${pos.locationType ? `<p>Route - ${pos.locationType}</p>` : ''}
              </div>`,
          });
          const marker = new google.maps.Marker({
            position: pos.location,
            map,
            icon:
              pos.locationType === 'pickup'
                ? `http://maps.google.com/mapfiles/kml/pushpin/ltblu-pushpin.png`
                : `https://maps.gstatic.com/mapfiles/ms2/micons/truck.png`,
            // shape: shape,
            title: pos.name,
            zIndex: 4,
          });

          marker.addListener('click', () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
          googleMarker.current.push(marker);
          googleInfoWindow.current.push(infowindow);
          bounds.extend(pos.location);
        });
        map.fitBounds(bounds);
        // const userCoordinate = new google.maps.Polyline({
        //   path: props.positions.map(mp => new google.maps.LatLng(mp.location.lat, mp.location.lng)),
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 5,
        //   strokeWeight: 5,
        // });
        // userCoordinate.setMap(map);
        if (props.positions.length == 1) {
          const listener = google.maps.event.addListener(map, 'idle', () => {
            map.setZoom(8);
            google.maps.event.removeListener(listener);
          });
        }
        if (props.positions.length === 0) getLocation();
      } else {
        map.overlayMapTypes.setAt(0, null);
        getLocation();
      }
    } else {
      getLocation();
    }
    return () => clearMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, props.positions]);

  const onLoad = useCallback((marker: any) => setMap(marker), []);
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20} onLoad={onLoad} onClick={hideInfoWindows} />
  ) : (
    <Spinner animation={'border'} />
  );
}

export default React.memo(Index);
