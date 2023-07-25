import { memo } from 'react';

const OurSiteVisitPage = () => {
  return (
    <>
      <section
        className="about-area about-p pt-120 pb-120 p-relative fix"
        style={{
          backgroundImage: 'url(assets/img/bg/admission_bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
        }}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="s-about-img p-relative  wow fadeInLeft animated"
                data-animation="fadeInLeft"
                data-delay=".4s"
              >
                <img src="assets/img/features/socity.png" alt="img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="about-content s-about-content pl-15 wow fadeInRight  animated"
                data-animation="fadeInRight"
                data-delay=".4s"
              >
                <div className="about-title second-title pb-25">
                  <h2>Our International Site Visit & Training Programe</h2>
                </div>
                <p className="txt-clr">
                  We are dedicated towards our special courses which provides special training and opportunity to visit
                  international sites.
                </p>
                <p className="txt-clr">
                  We are in associational with International private and government organizations for student exchange
                  program, In which each Indian Student shall be exchanged with International Student for training
                  purpose during the program.
                </p>
                <p className="txt-clr">
                  To get trained as per international work culture and to explore different work style.
                </p>
                <p className="txt-clr">
                  Our association with different organizations globally not only supports for training but also support
                  us for Visa, Travelling, Local Support, Food & accommodation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(OurSiteVisitPage);
