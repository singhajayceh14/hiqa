import { memo } from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';

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
            <div className="row p-relative">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="single-counter wow fadeInUp animated"
                  data-animation="fadeInDown animated"
                  data-delay=".2s"
                >
                  <div className="counter p-relative">
                    <CountUp className="count" start={0} end={counter_data?.totalStudent ?? 0}></CountUp>
                    <p>
                      Our Happy <br />
                      Students
                    </p>
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
                    <CountUp className="count" start={15} end={counter_data?.totalCourse ?? 0}></CountUp>
                    <p>
                      Learning <br />
                      Courses
                    </p>
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
                    <CountUp className="count" start={12} end={counter_data?.totalPlacement ?? 0}></CountUp>
                    <p>
                      Total <br /> Placement
                    </p>
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
                    <CountUp className="count" start={15} end={counter_data?.totalStaff ?? 0}></CountUp>
                    <p>
                      Staff <br /> Labs
                    </p>
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
