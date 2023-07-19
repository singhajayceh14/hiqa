import { memo } from 'react';

import { COURSE_DATA } from '@/types/interfaces';

const CoursePage = (props: COURSE_DATA[]) => {
  const { course_data } = props;
  return (
    <>
      <section id="popular-courses" className="courses">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Courses</h2>
            <p>Popular Courses</p>
          </div>
          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {course_data.map((course: COURSE_DATA) => (
              <div key={course.id} className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="course-item">
                  <img src={course.image} className="img-fluid course-image" alt={course.name} />
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>{course.name}</h4>
                      
                    </div>
                    <h3>
                        <a href="course-details.html">Training Period: {course.duraion_course}</a>
                    </h3>
                    <p>
                        Duration Of Internship: Minimum  {course.duraion_course} <br />
                        Total Seats Yearly: {course.total_seat}
                        <br />
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: course.short_description }} />
                    
                    <div className="trainer d-flex justify-content-between align-items-center">
                      <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="" />
                        <span>Antonio</span>
                      </div>
                      <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;50 &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;65
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(CoursePage);
