import React from 'react';
import Link from 'next/link';

function AboutPage() {
  return (
    <>
      <section className="about-area about-p pt-120 pb-120 p-relative fix" style={{ background: '#eff7ff' }}>
        <div className="animations-02">
          <img src="assets/img/bg/an-img-02.png" alt="contact-bg-an-01" />
        </div>

        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="s-about-img p-relative  wow fadeInLeft animated"
                data-animation="fadeInLeft"
                data-delay=".4s"
              >
                <img src="assets/img/features/about_img_02.png" alt="img" />
                <div className="about-text second-about">
                  <span>
                    25 <sub>+</sub>
                  </span>
                  <p>Years of Experience</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="about-content s-about-content pl-15 wow fadeInRight  animated"
                data-animation="fadeInRight"
                data-delay=".4s"
              >
                <div className="about-title second-title pb-25">
                  <h5>
                    <i className="fal fa-graduation-cap" /> About Our Institute
                  </h5>
                  <h2>We Bring The Right Person To The Correct Place.</h2>
                </div>
                <p className="txt-clr">
                  We are the first & only Institute in India which provides the best training with the latest
                  technologies at 100% free of cost.
                </p>
                <p>
                  We provide free Dress, stationery, food, and accommodation to the students admitted to our Institute.
                </p>
                <div className="about-content2">
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="green2">
                        <li>
                          <div className="abcontent">
                            <div className="ano">
                              <span>01</span>
                            </div>{' '}
                            <div className="text">
                              <h3>Guaranteed Site Visits</h3> <p>National / International site visits.</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="abcontent">
                            <div className="ano">
                              <span>02</span>
                            </div>{' '}
                            <div className="text">
                              <h3>Guaranteed Paid Internship</h3>{' '}
                              <p>Minimum Internship & Payments</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="slider-btn mt-20">
                  <Link href="/about" className="btn ss-btn smoth-scroll">
                    Read More <i className="fal fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
