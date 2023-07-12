import React from 'react';

import AddressForm from './AddressForm';

function AddAddress() {
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Add Address</h2>
        </div>
      </div>
      <AddressForm />
    </div>
  );
}

export default AddAddress;
