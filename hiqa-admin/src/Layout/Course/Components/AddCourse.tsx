import React from 'react';

import CourseForm from './CourseForm';

function AddCourse() {
  return (
    <div className={`cmnTable`}>
      <div className="cmnTableHeader">
        <div className="tableHeading row">
          <div className="col-md-8 ">
            <h2>Add Course</h2>
          </div>
        </div>
      </div>
      <CourseForm state={{}} />
    </div>
  );
}

export default AddCourse;
