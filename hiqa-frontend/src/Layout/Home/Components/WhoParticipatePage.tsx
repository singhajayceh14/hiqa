import { memo } from 'react';

const WhoParticipatePage = () => (
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
                <h2>Who Can Participate</h2>
              </div>
              <p className="txt-clr">
                This is a state wise driven campaign, students who are studying in any of listed Institute can
                participate.
              </p>
              <p className="txt-clr">Eligible Institutes:</p>
              <ol>
                <li>Any M-Tech/M.E</li>
                <li>Any B-Tech/B-E</li>
                <li>Any Diploma</li>
                <li>Any Bachler Degree / B.Sc.</li>
                <li>Any ITI</li>
                <li>12th (With Physics)</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
export default memo(WhoParticipatePage);
