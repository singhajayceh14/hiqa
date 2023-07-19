import { memo } from 'react';
import Link from 'next/link';

const OpportunityPage = () => (
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
                <h2>Where are the Opportunities</h2>
              </div>
              <p className="txt-clr">
                A wide range of opportunities open in Nation & International market after getting trained by our
                institute for following industries:
              </p>
              <ol>
                <li>Oil & gas Industries</li>
                <li>Refineries & Petrochemicals</li>
                <li>Fertilizers & Chemicals Industries</li>
                <li>Power Sector (Wind, Thermal, Gas, Solar, Hydro)</li>
                <li>Marine and Off- Shores</li>
                <li>Manufacturing Industries</li>
                <li>Automobiles</li>
                <li>Aerospace</li>
                <li>Production Industries</li>
                <li>Service Industries</li>
                <li>Pharma Industries</li>
                <li>Railways</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
export default memo(OpportunityPage);
