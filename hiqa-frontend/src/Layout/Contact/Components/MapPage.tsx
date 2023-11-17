import React, { memo } from 'react';

import { SETTINGS_DATA } from '@/types/interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MapPage(props: { personalData: SETTINGS_DATA }) {
  // eslint-disable-next-line no-unsafe-optional-chaining

  return (
    <>
      <div className="map fix" style={{ background: '#f5f5f5' }}>
        <div className="container-flud">
          <div className="row">
            <div className="col-lg-12">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOaFpZiCYM2ZcP5FUqNzs4U3ps0f8GcpQ&q=HiQA%2C%20Sector%2062%2C%20Noida%2C%20Uttar%20Pradesh%2C%20India%20`}
                width={600}
                height={450}
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(MapPage);
