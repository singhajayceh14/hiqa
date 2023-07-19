import React, { memo } from 'react';
import Link from 'next/link';

import { useApp } from '@/components/App';

const Footer = () => {
  const { state } = useApp();
  return (
    <footer
      className="footer-bg footer-p pt-90"
      style={{ backgroundColor: '#125875', backgroundImage: 'url(assets/img/bg/footer-bg.png)' }}
    >
      <div className="footer-top pb-70">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title">
                  <h2>About Us</h2>
                </div>
                <div className="f-contact">
                  <p>
                    Suspendisse non sem ante. Cras pretium gravida leo a convallis. Nam malesuada interdum metus, sit
                    amet dictum ante congue eu. Maecenas ut maximus enim.
                  </p>
                </div>
                <div className="footer-social mt-10">
                  <Link href={state?.setting_data?.facebook_url} title="Facebook">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link href={state?.setting_data?.instagram_url} title="Instagram">
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link href={state?.setting_data?.twitter_url} title="Twitter">
                    <i className="fab fa-twitter" />
                  </Link>
                  <Link href={state?.setting_data?.linkedin_url} title="LinkedIn">
                    <i className="fab fa-linkedin-in" />
                  </Link>
                  <Link href={state?.setting_data?.skype_url} title="Skype">
                    <i className="fab fa-skype" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title">
                  <h2>Our Links</h2>
                </div>
                <div className="footer-link">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about"> About</Link>
                    </li>
                    <li>
                      <Link href="/courses">Courses</Link>
                    </li>
                    <li>
                      <Link href="/contact"> Contact Us</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blog </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title">
                  <h2>Latest Post</h2>
                </div>
                <div className="recent-blog-footer">
                  <ul>
                    <li>
                      <div className="thum">
                        <img src="assets/img/blog/s-blogimg-01.png" alt="img" />
                      </div>
                      <div className="text">
                        <Link href="/blog-details">Nothing impossble to need hard work</Link>
                        <span>7 March, 2020</span>
                      </div>
                    </li>
                    <li>
                      <div className="thum">
                        <img src="assets/img/blog/s-blogimg-02.png" alt="img" />
                      </div>
                      <div className="text">
                        <Link href="/blog-details">Nothing impossble to need hard work</Link>
                        <span>7 March, 2020</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="footer-widget mb-30">
                <div className="f-widget-title">
                  <h2>Contact Us</h2>
                </div>
                <div className="f-contact">
                  <ul>
                    <li>
                      <i className="icon fal fa-phone" />
                      <span>
                        <Link href={'tel:' + state?.setting_data?.phone}>{state?.setting_data?.phone}</Link>
                        <br />
                        <Link href={'tel:' + state?.setting_data?.phone}>{state?.setting_data?.phone}</Link>
                      </span>
                    </li>
                    <li>
                      <i className="icon fal fa-envelope" />
                      <span>
                        <Link href={'mailto:' + state?.setting_data?.email}>{state?.setting_data?.email}</Link>
                        <br />
                        <Link href={'mailto:' + state?.setting_data?.email}>{state?.setting_data?.email}</Link>
                      </span>
                    </li>
                    <li>
                      <i className="icon fal fa-map-marker-check" />
                      <span>{state?.setting_data?.address}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="copy-text">
                <Link href="/">
                  <img src="assets/img/logo/f_logo.png" alt="img" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 text-center"></div>
            <div className="col-lg-4 text-right text-xl-right">Copyright © HIQA 2023 . All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
