import { memo } from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';
import { convert } from '@/utils/helpers';

const AdmissionPage = ({
  counter_data,
}: {
  counter_data: { totalStudent: number; totalCourse: number; totalPlacement: number; totalStaff: number };
}) => {
  return (
    <>
      <section
        className="about-area about-p pb-120 p-relative fix"
        style={{
          backgroundImage: 'url(assets/img/bg/admission_bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
        }}
      >
        <div className="counter-area" style={{ background: '#ff7350' }}>
          <div className="container">
            <h3 className="counterHead">2022 - 2023 Years</h3>
            <div className="row p-relative">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="single-counter wow fadeInUp animated"
                  data-animation="fadeInDown animated"
                  data-delay=".2s"
                >
                  <div className="counter p-relative">
                    <span className="count">{convert(counter_data?.totalStudent) ?? 0}</span>
                    <p>Our Happy Students</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="single-counter wow fadeInUp animated"
                  data-animation="fadeInDown animated"
                  data-delay=".2s"
                >
                  <div className="counter p-relative">
                    <span className="count">{convert(counter_data?.totalCourse) ?? 0}</span>
                    <p>Learning Courses</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="single-counter wow fadeInUp animated"
                  data-animation="fadeInDown animated"
                  data-delay=".2s"
                >
                  <div className="counter p-relative">
                    <span className="count">{convert(counter_data?.totalPlacement) ?? 0}</span>
                    <p>Total Placement</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="single-counter wow fadeInUp animated"
                  data-animation="fadeInDown animated"
                  data-delay=".2s"
                >
                  <div className="counter p-relative">
                    <span className="count">{convert(counter_data?.totalStaff) ?? 0}</span>
                    <p>Staff Labs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(AdmissionPage);
