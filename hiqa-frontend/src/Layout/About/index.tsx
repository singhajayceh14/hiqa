import React, { memo } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import FrontContainer from '@/Layout/FrontContainer';

function Index() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content={'About Us' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <section className="about-area about-p pt-50 pb-50 p-relative fix">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div
                className="s-about-img3 p-relative  wow fadeInLeft animated"
                data-animation="fadeInLeft"
                data-delay=".4s"
              >
                <img src="/assets/img/features/about_img_02.png" alt="img" />
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
                  We are the First & only Institute In India which provides the best training with the latest
                  technologies at 100% free of cost.
                </p>
                <p className="txt-clr">
                  We provide free Dress, stationery, food, and accommodation to the students admitted to our Institute.
                </p>
                <div className="about-content2">
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="green2">
                        <li className="li2">
                          <div className="abcontent">
                            <div className="ano2">
                              <span>01</span>
                            </div>{' '}
                            <div className="text">
                              <h4>Guaranteed National Site Visits</h4>{' '}
                            </div>
                          </div>
                        </li>
                        <li className="li2">
                          <div className="abcontent">
                            <div className="ano2">
                              <span>02</span>
                            </div>{' '}
                            <div className="text">
                              <h4>Guaranteed International Site Visits</h4>{' '}
                            </div>
                          </div>
                        </li>
                        <li className="li2">
                          <div className="abcontent">
                            <div className="ano2">
                              <span>03</span>
                            </div>{' '}
                            <div className="text">
                              <h4>No Charges</h4>{' '}
                            </div>
                          </div>
                        </li>
                        <li className="li2">
                          <div className="abcontent">
                            <div className="ano2">
                              <span>04</span>
                            </div>{' '}
                            <div className="text">
                              <h4>Guaranteed Minimum Internship & Payments</h4>{' '}
                            </div>
                          </div>
                        </li>
                        <li className="li2">
                          <div className="abcontent">
                            <div className="ano2">
                              <span>05</span>
                            </div>{' '}
                            <div className="text">
                              <h4>
                                Site visit - Official at Furtilizer, Checmical,
                                <br /> Oil, Gas, etc. Industries
                              </h4>{' '}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-area cta-bg pt-30 pb-30" style={{ background: '#ff7350' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div
                className="section-title cta-title wow fadeInLeft animated"
                data-animation="fadeInDown animated"
                data-delay=".2s"
              >
                <h2>Qeducato gives you the tools to create an online course.</h2>
              </div>
            </div>
            <div className="col-lg-4 text-right">
              <div
                className="cta-btn2 s-cta-btn wow fadeInRight animated"
                data-animation="fadeInDown animated"
                data-delay=".2s"
              >
                <Link href="/contact" className="btn ss-btn smoth-scroll">
                  Contact Us <i className="fal fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
