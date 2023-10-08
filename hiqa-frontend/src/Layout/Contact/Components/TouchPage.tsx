import React, { memo } from 'react';

import { SETTINGS_DATA } from '@/types/interfaces';

function TouchPage(props: { personalData: SETTINGS_DATA }) {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { email, phone, address } = props?.personalData;

  return (
    <>
      <section id="services" className="services-area pt-50 pb-50 fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center mb-50 wow fadeInDown animated"
                data-animation="fadeInDown"
                data-delay=".4s"
              >
                <h5>
                  <i className="fas fa-address-card" /> Contact Info
                </h5>
                <h2>Get In Touch</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {phone ? (
              <div className="col-lg-4 col-md-4">
                <div className="services-box text-center">
                  <div className="services-icon">
                    <img src="assets/img/bg/contact-icon01.png" alt="image" />
                  </div>
                  <div className="services-content2">
                    <h5>
                      <a href={'tel:' + phone}>{phone}</a>
                    </h5>
                    <p>Phone Support</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="col-lg-4 col-md-4">
              <div className="services-box text-center active">
                <div className="services-icon">
                  <img src="assets/img/bg/contact-icon02.png" alt="image" />
                </div>
                <div className="services-content2">
                  <h5>
                    <a href={'mailto:' + email}>{email}</a>
                  </h5>
                  <p>Email Address</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="services-box text-center">
                <div className="services-icon">
                  <img src="assets/img/bg/contact-icon03.png" alt="image" />
                </div>
                <div className="services-content2">
                  <h6>{address}</h6>
                  <p>Office Address</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(TouchPage);
