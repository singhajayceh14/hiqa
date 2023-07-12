import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';

// import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { toastr } from '@/utils/helpers';

interface POSITION {
  id: string;
  name: string;
  type: string;
  location: LOCATION;
}
interface LOCATIONPOSITIONS {
  id: string;
  name: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
}
interface LOCATION {
  start: {
    lat: number;
    lng: number;
  };
  end: {
    lat: number;
    lng: number;
  };
}

interface PROPS {
  id?: string;
  width?: string;
  height?: string;
  positions?: POSITION[];
  locations?: LOCATIONPOSITIONS[];
  fullWidth?: boolean;
  direction?: {
    start: string;
    end: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}
// interface MAPS {
//   center: LOCATION;
//   positions: POSITION[];
//   zoom: number;
// }

function Index(props: PROPS) {
  const [map, setMap] = useState(null) as any;
  const googleMarker = useRef<google.maps.Marker[]>([]);
  const directionRenderer = useRef<google.maps.DirectionsRenderer>();
  const googleInfoWindow = useRef<google.maps.InfoWindow[]>([]);

  const containerStyle = {
    width: '100%',
    height: props.fullWidth ? '100vh' : '500px',
  };

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
    createMarkers();
  }
  function attachInstructionText(
    stepDisplay: google.maps.InfoWindow,
    marker: google.maps.Marker,
    text: string,
    map: google.maps.Map,
  ) {
    googleInfoWindow.current.push(stepDisplay);
    google.maps.event.addListener(marker, 'click', () => {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
  }

  function showSteps(
    directionResult: google.maps.DirectionsResult,
    markerArray: google.maps.Marker[],
    stepDisplay: google.maps.InfoWindow,
    map: google.maps.Map,
  ) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    const myRoute = directionResult?.routes[0]?.legs[0];

    for (let i = 0; i < myRoute.steps.length; i++) {
      const marker = (markerArray[i] = markerArray[i] || new google.maps.Marker());
      googleMarker.current.push(marker);
      marker.setMap(map);
      marker.setPosition(myRoute.steps[i].start_location);
      attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
  }
  function createMarkers() {
    const bounds = new window.google.maps.LatLngBounds();
    if (props?.locations && props?.locations?.length) {
      clearMarkers();
      // const cascadiaFault = new google.maps.Polyline({
      //   path: props.locations.map(loc => new google.maps.LatLng(loc.location.lat, loc.location.lng)),
      //   strokeOpacity: 0,
      //   // strokeWeight: 0,
      // });

      // cascadiaFault.setMap(map);
      props.locations.map(pos => {
        const duplicateLocation = props.locations?.find(
          loc => loc.location.lat === pos.location.lat && loc.type !== pos.type,
        );
        const infowindow = new google.maps.InfoWindow({
          content: `
            <div>
              <p>Name  - ${pos.name} ${duplicateLocation ? duplicateLocation.name : ''}</p>
              <p>Type  - ${pos.type?.charAt(0).toUpperCase() + pos.type?.slice(1)} ${
            duplicateLocation ? (pos.type == 'pickup' ? 'DropOff' : 'Pickup') : ''
          }</p>
            </div>
          `,
        });
        const marker = new google.maps.Marker({
          position: pos.location,
          map,
          icon: `http://maps.google.com/mapfiles/kml/pushpin/${pos.type === 'pickup' ? 'ylw' : 'ltblu'}-pushpin.png`,
          // shape: shape,
          title: `${pos.name}`,
          zIndex: 10,
        });
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
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
        marker.setMap(map);
        return marker;
      });
    }

    if (props?.location && props?.location?.lat && props?.location?.lng && map) {
      const infowindow = new google.maps.InfoWindow({
        content: `
          <div>
            <p>Here is your truck</p>
          </div>
        `,
      });

      const marker = new google.maps.Marker({
        position: props?.location,
        map,
        title: 'Here is your truck.',
        zIndex: 999,
      });

      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
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
      bounds.extend(props?.location);
      marker.setMap(map);
      map.setZoom(13);
      map.panTo(props?.location);
    } else {
      map.fitBounds(bounds);
    }
  }

  function calculateAndDisplayRoute(
    directionsRenderer: google.maps.DirectionsRenderer,
    directionsService: google.maps.DirectionsService,
    markerArray: google.maps.Marker[],
    stepDisplay: google.maps.InfoWindow,
    map: google.maps.Map,
    directions: { start: string; end: string },
  ) {
    // First, remove any existing markers from the map.
    clearMarkers();

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService
      .route({
        origin: directions.start,
        destination: directions.end,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((result: google.maps.DirectionsResult) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        // (document.getElementById('warnings-panel') as HTMLElement).innerHTML =
        //   '<b>' + result.routes[0].warnings + '</b>';
        if (props?.location) {
          directionsRenderer.setOptions({ preserveViewport: true });
        }
        directionsRenderer.setDirections(result);
        if (props.direction) showSteps(result, markerArray, stepDisplay, map);
      })
      .catch(e => {
        toastr(e.message, 'error');
      });
  }

  useEffect(() => {
    clearMarkers();
    if (map) {
      // Instantiate a directions service.
      const directionsService = new google.maps.DirectionsService();
      // Instantiate an info window to hold step text.
      const stepDisplay = new google.maps.InfoWindow();
      if (props.direction) {
        // Create a renderer for directions and bind it to the map.
        if (directionRenderer.current) directionRenderer.current.setMap(null);
        directionRenderer.current = new google.maps.DirectionsRenderer({ map: map });
        // Display the route between the initial start and end selections.
        if (props.direction.start && props.direction.end)
          calculateAndDisplayRoute(
            directionRenderer.current,
            directionsService,
            googleMarker.current,
            stepDisplay,
            map,
            props.direction,
          );
      } else if (props.positions) {
        // Create a renderer for directions and bind it to the map.
        if (directionRenderer.current) directionRenderer.current.setMap(null);
        props.positions.map(pos => {
          directionRenderer.current = new google.maps.DirectionsRenderer({ map: map, suppressMarkers: true });
          return calculateAndDisplayRoute(
            directionRenderer.current,
            directionsService,
            googleMarker.current,
            stepDisplay,
            map,
            {
              start: `${pos.location.start.lat},${pos.location.start.lng}`,
              end: `${pos.location.end.lat},${pos.location.end.lng}`,
            },
          );
        });
      } else {
        map.overlayMapTypes.setAt(0, null);
      }
      createMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, props.direction, props.id, props?.location]);

  const onLoad = useCallback((marker: any) => {
    setMap(marker);

    // Adding traffic layer to the map
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(marker);
  }, []);

  const options = {
    panControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER, // 'right-center' ,
      // ...otherOptions
    },
  };

  return (
    // <LoadScript googleMapsApiKey="AIzaSyAieBrtjSXRb9G4SYtxh0TL03MDwmyDgqA">
    <GoogleMap
      options={options}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onClick={hideInfoWindows}
    />
    // </LoadScript>
  );
}

export default React.memo(Index);
