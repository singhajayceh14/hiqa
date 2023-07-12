import React, { useState, memo } from 'react';
import { Form } from 'react-bootstrap';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

import { useSettings } from '@/components/App';

interface ADDRESS {
  [key: string]: unknown;
}

interface PROPS {
  name?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  onChange?: any;
  value?: string;
  isInvalid?: boolean;
  onSelectOption?: (address: ADDRESS) => void;
  errors?: string;
}
type Libraries = ('places' | 'geometry' | 'drawing' | 'localContext' | 'visualization')[];
function Index({ errors, onSelectOption, ...rest }: PROPS) {
  const settings = useSettings();
  const [libraries] = useState(['places'] as Libraries);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: settings.googleAPIKey,
    libraries: libraries,
  });
  const [autoComplete, setautoComplete] = useState<any>(null);

  const onLoad = (data: any) => {
    setautoComplete(data);
  };
  const formatAutocompleteAddress = (place: ADDRESS) => {
    const data: ADDRESS = {
      lat: '',
      lng: '',
      formattedAddress: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    };
    if (place.geometry !== undefined) {
      const placeGeoLocation = place.geometry as any;
      if (placeGeoLocation.location !== undefined) {
        data['lat'] = placeGeoLocation.location ? placeGeoLocation.location.lat() : '';
        data['lng'] = placeGeoLocation.location ? placeGeoLocation.location.lng() : '';
      }
    }
    data['formattedAddress'] = place?.formatted_address || '';
    if (place?.address_components) {
      const addressComponent = place?.address_components as any;
      for (const addr of addressComponent) {
        if (addr?.types?.[0]) {
          const typeofAddress = addr.types[0];
          if (typeofAddress === 'administrative_area_level_1') data['state'] = addr.long_name;
          if (typeofAddress === 'locality') data['city'] = addr.long_name;
          if (typeofAddress === 'country') data['country'] = addr.long_name;
          if (typeofAddress === 'postal_code') data['postalCode'] = addr.long_name;
        }
      }
    }
    return data;
  };
  const onPlaceChanged: any = () => {
    if (autoComplete) {
      if (onSelectOption) onSelectOption(formatAutocompleteAddress(autoComplete.getPlace()));
    }
  };
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return isLoaded ? (
    <div>
      {/* <LoadScript googleMapsApiKey="AIzaSyAieBrtjSXRb9G4SYtxh0TL03MDwmyDgqA" libraries={['places']}> */}
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        fields={['address_components', 'geometry', 'formatted_address']}
        // types={['address']}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{rest.placeholder}</Form.Label>
          <Form.Control {...rest} />
          {errors !== undefined ? <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback> : null}
          <Form.Text muted>Search to choose a Place</Form.Text>
        </Form.Group>
      </Autocomplete>
      {/* </LoadScript> */}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default memo(Index);
