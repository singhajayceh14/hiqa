import Link from 'next/link';
import React, { memo } from 'react';

import { useApp } from '@/components/App';

function HIQADetails() {
  const { state } = useApp();
  return (
    <>
      <section className="project-detail">
        <div className="container">
          <div className="lower-content2">
            <div className="row">
              <div className="text-column col-lg-12 col-md-12 col-sm-12">
                <div className="s-about-content wow fadeInRight" data-animation="fadeInRight" data-delay=".2s">
                  <h2 className="text-center">INTRO TO HIQA</h2>
                  <p></p>
                  <p>
                    Welcome to <Link href={'/'}>HIQA</Link>, a beacon of opportunity and excellence in education. At{' '}
                    <Link href={'/'}>HIQA</Link>, we believe that every deserving student should have the chance to
                    transform their aspirations into achievements, regardless of financial barriers. With a steadfast
                    commitment to nurturing talent and fostering growth, we stand as a testament to the power of
                    education to shape lives.
                  </p>

                  <p>
                    Our institute takes pride in offering free training and placement to exceptional students on a
                    general exam basis. We understand that talent knows no boundaries, and financial constraints should
                    never stand in the way of realizing one's potential. Through our unique approach, we not only
                    provide top-notch education and training but also pave a path towards promising career
                    opportunities.
                  </p>
                  <p>
                    At <Link href={'/'}>HIQA</Link>, we don't just impart knowledge; we ignite the flames of curiosity
                    and inspire the pursuit of excellence. Our faculty consists of dedicated educators who are
                    passionate about cultivating intellectual curiosity and critical thinking skills in our students.
                    Through rigorous training and personalized guidance, we ensure that each student reaches their
                    highest potential.
                  </p>
                  <p>
                    What sets us apart is our unwavering commitment to recognizing and supporting deserving individuals
                    who demonstrate exceptional academic prowess and a drive to succeed. We firmly believe that by
                    investing in the education of these talented minds, we are investing in a brighter future for our
                    society and the world at large.
                  </p>
                  <p>
                    Join us at <Link href={'/'}>HIQA</Link> and embark on a transformation journey that not only shapes
                    your education but also elevates your prospects. With us, education is not just a destination; it's
                    a steppingstone towards a world of endless possibilities. Discover your potential, seize
                    opportunities, and together, let's build a future that thrives on the merits of deserving talent.
                  </p>
                  <div className="two-column mt-30">
                    <div className="row aling-items-center">
                      <div className="image-column col-xl-6 col-lg-12 col-md-12">
                        <div className="footer-social mt-10">
                          <Link href={state?.setting_data?.facebook_url ?? '#'} title="Facebook">
                            <i className="fab fa-facebook-f" />
                          </Link>
                          <Link href={state?.setting_data?.instagram_url ?? '#'} title="Instagram">
                            <i className="fab fa-instagram" />
                          </Link>
                          <Link href={state?.setting_data?.twitter_url ?? '#'} title="Twitter">
                            <i className="fab fa-twitter" />
                          </Link>
                          <Link href={state?.setting_data?.linkedin_url ?? '#'} title="LinkedIn">
                            <i className="fab fa-linkedin-in" />
                          </Link>
                          <Link href={state?.setting_data?.youtube_url ?? '#'} title="Youtube">
                            <i className="fab fa-youtube" />
                          </Link>
                        </div>
                      </div>
                      <div className="text-column col-xl-6 col-lg-12 col-md-12 text-right"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(HIQADetails);
