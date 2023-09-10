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
                  Welcome to our distinguished institute, a beacon of hope and opportunity for deserving students
                  seeking to transform their lives through education and skill development. We stand as a testament to
                  the belief that merit knows no boundaries, and every individual with potential should have access to
                  the tools necessary for success. Our mission is simple yet powerful: to provide free training and
                  unparalleled placement assistance to those who have demonstrated exceptional merit and a thirst for
                  knowledge.
                </p>
                <p>
                  In a world where opportunities are often unevenly distributed, we have committed ourselves to bridging
                  the gap and paving a path for talented students to shine and thrive. Join us in this journey of
                  empowerment, where potential meets possibility, and dreams are realized through the synergy of
                  education and rightful opportunity.
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
                              <h3>Guaranteed Paid Internship</h3> <p>Minimum Internship & Payments</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="slider-btn mt-20">
                  <Link href="/hiqa-details" className="btn ss-btn smoth-scroll">
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
