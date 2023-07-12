import React from 'react';

import FrontPageForm from './FrontPageForm';

function AddFrontPage() {
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Add Front Page</h2>
        </div>
      </div>
      <FrontPageForm state={{}} />
    </div>
  );
}

export default AddFrontPage;
