import { memo } from 'react';
import Link from 'next/link';

const ScholarshipPage = () => {
  return (
    <section className="cta-area cta-bg pt-50 pb-50" style={{ backgroundImage: 'url(assets/img/bg/cta_bg02.png)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="section-title cta-title wow fadeInLeft animated"
              data-animation="fadeInDown animated"
              data-delay=".2s"
            >
              <h2>Placement Programs</h2>
              <p>
                A wide range of opportunities open in Nation & International market after getting trained by our
                institute for following industries:
              </p>
            </div>
          </div>
          <div className="col-lg-4 text-right">
            <div
              className="cta-btn s-cta-btn wow fadeInRight animated mt-30"
              data-animation="fadeInDown animated"
              data-delay=".2s"
            >
              <Link href="/about" className="btn ss-btn smoth-scroll">
                More Info <i className="fal fa-long-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(ScholarshipPage);
