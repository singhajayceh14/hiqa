import React, { useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface POSITION {
  coords: {
    latitude: number;
    longitude: number;
  };
}
interface PROPS {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
}
function Index(props: PROPS) {
  const [center, setcenter] = useState({
    lat: props.lat || -3.745,
    lng: props.lng || -38.523,
  });
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  const containerStyle = {
    width: '100%',
    height: '500px',
  };
  function showPosition(position: POSITION) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setcenter({ lat, lng });
    // map.setCenter(new google.maps.LatLng(lat, lng));
  }
  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <LoadScript googleMapsApiKey="AIzaSyAieBrtjSXRb9G4SYtxh0TL03MDwmyDgqA">
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
    // </LoadScript>
  );
}

export default React.memo(Index);
