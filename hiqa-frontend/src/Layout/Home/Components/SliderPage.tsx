import React, { MouseEventHandler } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

import Background from '../../../assets/img/slider/slider_bg.png';
import Backgroundtwo from '../../../assets/img/slider/slider_bg_01.png';

function NextArrow(props: { className: string; style: any; onClick: MouseEventHandler<HTMLButtonElement> }) {
  const { className, style, onClick } = props;
  return (
    <button type="button" className={`slick-next ${className}`} style={{ ...style }} onClick={onClick}>
      <i className="far fa-angle-right"></i>
    </button>
  );
}

function PrevArrow(props: { className: string; style: any; onClick: MouseEventHandler<HTMLButtonElement> }) {
  const { className, style, onClick } = props;
  return (
    <button type="button" className={`slick-prev ${className}`} style={{ ...style }} onClick={onClick}>
      <i className="far fa-angle-left"></i>
    </button>
  );
}

function SliderPage() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 10000,
    dots: false,
    fade: true,
    arrows: true,
    prevArrow: (
      <PrevArrow
        className={''}
        style={undefined}
        onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
          throw new Error('Function not implemented.');
        }}
      />
    ),
    nextArrow: (
      <NextArrow
        className={''}
        style={undefined}
        onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
          throw new Error('Function not implemented.');
        }}
      />
    ),
    responsive: [{ breakpoint: 1200, settings: { dots: false, arrows: false } }],
  };

  return (
    <>
      <section id="home" className="slider-area fix p-relative">
        <Slider className="slider-active" {...settings}>
          <div>
            <div
              className="single-slider slider-bg"
              style={{ backgroundImage: `url(${Background.src})`, backgroundSize: 'cover' }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-7">
                    <div className="slider-content s-slider-content mt-130">
                      <h5 data-animation="fadeInUp" data-delay=".4s">
                        welcome To HIQA
                      </h5>
                      <h2 data-animation="fadeInUp" data-delay=".4s">
                        Education is the best key success in life
                      </h2>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Donec vitae libero non enim placerat eleifend aliquam erat volutpat. Curabitur diam ex, dapibus
                        purus sapien, cursus sed nisl tristique, commodo gravida lectus non.
                      </p>
                      <div className="slider-btn mt-30">
                        <Link href="/about" className="btn ss-btn mr-15" data-animation="fadeInLeft" data-delay=".4s">
                          Discover More <i className="fal fa-long-arrow-right" />
                        </Link>
                        <Link
                          href="/contact"
                          className="btn ss-btn active"
                          data-animation="fadeInLeft"
                          data-delay=".4s"
                        >
                          Contact Us <i className="fal fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5 p-relative"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className="single-slider slider-bg"
              style={{ backgroundImage: `url(${Backgroundtwo.src})`, backgroundSize: 'cover' }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-7">
                    <div className="slider-content s-slider-content mt-130">
                      <h5 data-animation="fadeInUp" data-delay=".4s">
                        welcome To HIQA
                      </h5>
                      <h2 data-animation="fadeInUp" data-delay=".4s">
                        Reinforcing the youth and empowering the country
                      </h2>
                      <p data-animation="fadeInUp" data-delay=".6s">
                        Donec vitae libero non enim placerat eleifend aliquam erat volutpat. Curabitur diam ex, dapibus
                        purus sapien, cursus sed nisl tristique, commodo gravida lectus non.
                      </p>
                      <div className="slider-btn mt-30">
                        <Link href="/about" className="btn ss-btn mr-15" data-animation="fadeInLeft" data-delay=".4s">
                          Discover More <i className="fal fa-long-arrow-right" />
                        </Link>
                        <Link
                          href="/contact"
                          className="btn ss-btn active"
                          data-animation="fadeInLeft"
                          data-delay=".4s"
                        >
                          Contact Us <i className="fal fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5 p-relative"></div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      <section className="service-details-two p-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="services-box07">
                <div className="sr-contner">
                  <div className="icon">
                    <img src="assets/img/icon/sve-icon4.png" alt="icon01" />
                  </div>
                  <div className="text">
                    <h5>
                      <Link href="/about">FREE TRAINING & CERTIFICATION</Link>
                    </h5>
                    <p>
                      We are providing free training and certifications for the students. Including Theoretical,
                      Practical and On-Site Training
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="services-box07 active">
                <div className="sr-contner">
                  <div className="icon">
                    <img src="assets/img/icon/sve-icon6.png" alt="icon01" />
                  </div>
                  <div className="text">
                    <h5>
                      <Link href="/about">GUARANTEED PAID INTERNSHIP</Link>
                    </h5>
                    <p>
                      A paid internship program shall be provided to each student, where student can work and get
                      experience as well as earn for a defined period and a chance for International Visit
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="services-box07">
                <div className="sr-contner">
                  <div className="icon">
                    <img src="assets/img/icon/sve-icon5.png" alt="icon01" />
                  </div>
                  <div className="text">
                    <h5>
                      <Link href="/about">FREE ACCOMODATION & FOOD</Link>
                    </h5>
                    <p>
                      Free Accommodation & Food is provided to the students during their training period at the training
                      centre as well as during the Paid Internship Period
                    </p>
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

export default SliderPage;
