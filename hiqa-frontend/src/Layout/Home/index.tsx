import React, { memo, useCallback, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Marquee from 'react-fast-marquee';

import FrontContainer from '@/Layout/FrontContainer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { useCommonReducer } from '@/components/App/reducer';
import { SuspenseLoader } from '@/components/App/Loader';

const Banner = dynamic(() => import('./Components/Banner'), {
  loading: () => <div></div>,
  ssr: false,
});
const SectionPage = dynamic(() => import('./Components/SectionPage'), {
  loading: () => <div></div>,
  ssr: false,
});

const CoursePage = dynamic(() => import('./Components/CoursePage'), {
  loading: () => <div></div>,
  ssr: false,
});
function Index() {
  const { request, loading } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();

  const getFrontPage = useCallback(async () => {
    const res = (await request('getFrontPage', {})) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        ...(resData as any),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console;
  useEffect(() => {
    getFrontPage();
  }, [getFrontPage]);

  console.log(globalState);
  return (
    <>
      {loading?.getFrontPage_LOADING ? (
        <SuspenseLoader color={'#002e6e'} />
      ) : (
        <>
          <Head>
            <title>Home</title>
            <meta name="description" content={'Home' || 'HIQA'} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="favicon.ico" />
          </Head>
          <FrontContainer>
            <section id="hero" className="d-flex justify-content-center align-items-center">
              <Banner banners={globalState.banners} />
            </section>
            <main id="main">
              <section id="counts" className="counts section-bg" style={{ padding: 'unset' }}>
                <Marquee>
                  <div className="d-flex">
                    <img width={50} height={50} src={'assets/img/new-gif.gif'} alt="New Hurrey" />
                    <p style={{ margin: 'unset' }}>
                      I can be a React component, multiple React components, or just some text.
                    </p>
                  </div>
                </Marquee>
              </section>
              <SectionPage front_data={globalState.section_data} />
              <section id="counts" className="counts section-bg">
                <div className="container">
                  <div className="row counters">
                    <div className="col-lg-3 col-6 text-center">
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="1232"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Students</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="64"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Courses</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="42"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Events</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                      <span
                        data-purecounter-start="0"
                        data-purecounter-end="15"
                        data-purecounter-duration="1"
                        className="purecounter"
                      ></span>
                      <p>Trainers</p>
                    </div>
                  </div>
                </div>
              </section>
              <section id="why-us" className="why-us">
                <div className="container" data-aos="fade-up">
                  <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                      <div className="content">
                        <h3>OUR INTERNATIONAL SITE VISIT & TRAINING PROGRAM</h3>
                        <p>
                          We are dedicated towards our special courses which provides special training and opportunity
                          to visit international sites.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                      <div className="icon-boxes d-flex flex-column justify-content-center">
                        <div className="row">
                          <div className="col-xl-6 d-flex align-items-stretch">
                            <div className="icon-box mt-4 mt-xl-0">
                              <i className="bx bx-receipt"></i>
                              <h4>INTERNATIONAL SITE VISIT</h4>
                              <p>
                                We are in associational with International private and government organizations for
                                student exchange program, In which each Indian Student shall be exchanged with
                                International Student for training purpose during the program.
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-6 d-flex align-items-stretch">
                            <div className="icon-box mt-4 mt-xl-0">
                              <i className="bx bx-cube-alt"></i>
                              <h4>TRAINING PROGRAM</h4>
                              <p>
                                To get trained as per international work culture and to explore different work style.
                                Our association with different organizations globally not only supports for training but
                                also support us for Visa, Travelling, Local Support, Food & accommodation
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section id="features" className="features">
                <div className="container" data-aos="fade-up">
                  <div className="row" data-aos="zoom-in" data-aos-delay="100">
                    <div className="col-lg-3 col-md-4">
                      <div className="icon-box">
                        <i className="ri-store-line" style={{ color: '#ffbb2c' }}></i>
                        <h3>
                          <a href="">Lorem Ipsum</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                      <div className="icon-box">
                        <i className="ri-bar-chart-box-line" style={{ color: '#5578ff' }}></i>
                        <h3>
                          <a href="">Dolor Sitema</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                      <div className="icon-box">
                        <i className="ri-calendar-todo-line" style={{ color: '#e80368' }}></i>
                        <h3>
                          <a href="">Sed perspiciatis</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                      <div className="icon-box">
                        <i className="ri-paint-brush-line" style={{ color: '#e361ff' }}></i>
                        <h3>
                          <a href="">Magni Dolores</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-database-2-line" style={{ color: '#47aeff' }}></i>
                        <h3>
                          <a href="">Nemo Enim</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-gradienter-line" style={{ color: '#ffa76e' }}></i>
                        <h3>
                          <a href="">Eiusmod Tempor</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-file-list-3-line" style={{ color: '#11dbcf' }}></i>
                        <h3>
                          <a href="">Midela Teren</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-price-tag-2-line" style={{ color: '#4233ff' }}></i>
                        <h3>
                          <a href="">Pira Neve</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-anchor-line" style={{ color: '#b2904f' }}></i>
                        <h3>
                          <a href="">Dirada Pack</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-disc-line" style={{ color: '#b20969' }}></i>
                        <h3>
                          <a href="">Moton Ideal</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-base-station-line" style={{ color: '#ff5828' }}></i>
                        <h3>
                          <a href="">Verdo Park</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-4">
                      <div className="icon-box">
                        <i className="ri-fingerprint-line" style={{ color: '#29cc61' }}></i>
                        <h3>
                          <a href="">Flavor Nivelanda</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <CoursePage course_data={globalState.courses_list} />
            </main>
          </FrontContainer>
        </>
      )}
    </>
  );
}

// Index.auth = false;
export default memo(Index);
