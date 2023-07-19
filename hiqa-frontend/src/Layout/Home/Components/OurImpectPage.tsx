import { memo } from 'react';
import Link from 'next/link';

const OurImpectPage = () => {
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
                <img src="assets/img/features/about_img.png" alt="img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="about-content s-about-content pl-15 wow fadeInRight  animated"
                data-animation="fadeInRight"
                data-delay=".4s"
              >
                <div className="about-title second-title pb-25">
                  <h2>Our Impect on Society</h2>
                </div>
                <p className="txt-clr">
                  Generating 60+ Students every month and 720+ Students every Year with best training and in hand
                  experience for Free of Cost in a single state.
                </p>
                <p className="txt-clr">
                  6 to 12 Months Schedule where a students learns and earns and get explored to various National &
                  International Industrial Opportunities.
                </p>
                <p className="txt-clr">
                  Supporting National and Inter-State Industrial Development by providing expertized manpower.
                </p>
                <p className="txt-clr">
                  Developing Opportunities for Training & Employment for well deserved students in State.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(OurImpectPage);
