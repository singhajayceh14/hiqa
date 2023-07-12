import React from 'react';

import CourseForm from './CourseForm';

function AddCourse() {
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Add Course</h2>
        </div>
      </div>
      <CourseForm />
    </div>
  );
}

export default AddCourse;
