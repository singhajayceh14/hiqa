import React from 'react';

import UserForm from './UserForm';

function AddUser() {
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Add User</h2>
        </div>
      </div>
      <UserForm />
    </div>
  );
}

export default AddUser;
