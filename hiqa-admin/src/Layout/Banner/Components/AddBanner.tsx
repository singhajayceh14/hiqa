import React from 'react';

import BannerForm from './BannerForm';

function AddBanner() {
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Add Banner</h2>
        </div>
      </div>
      <BannerForm state={{}} />
    </div>
  );
}

export default AddBanner;
