import { memo, MouseEventHandler } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

import { COURSE_DATA } from '@/types/interfaces';

function NextArrow(props: { className?: string; style?: any; onClick?: MouseEventHandler<HTMLButtonElement> }) {
  const { className, style, onClick } = props;
  return (
    <button type="button" className={`slick-next ${className}`} style={{ ...style }} onClick={onClick}>
      <i className="far fa-angle-right"></i>
    </button>
  );
}

function PrevArrow(props: { className?: string; style?: any; onClick?: MouseEventHandler<HTMLButtonElement> }) {
  const { className, style, onClick } = props;
  return (
    <button type="button" className={`slick-prev ${className}`} style={{ ...style }} onClick={onClick}>
      <i className="far fa-angle-left"></i>
    </button>
  );
}
const CoursePage = ({ course_data }: { course_data: COURSE_DATA[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="courses pt-120 pb-120 p-relative fix">
        <div className="animations-01">
          <img src="assets/img/bg/an-img-03.png" alt="an-img-01" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-relative">
              <div
                className="section-title center-align mb-50 wow fadeInDown animated"
                data-animation="fadeInDown"
                data-delay=".4s"
              >
                <h5>
                  <i className="fal fa-graduation-cap" /> Our Courses
                </h5>
                <h2>Training Programs</h2>
              </div>
            </div>
          </div>
          <Slider className="row class-active" {...settings}>
            {course_data.map((course: COURSE_DATA, index: number) => (
              <div key={index} className="col-lg-4 col-md-6 ">
                <div className="courses-item mb-30 hover-zoomin">
                  <div className="thumb fix">
                    <Link href={'course/' + course.slug}>
                      <img src={course.image} alt="contact-bg-an-01" />
                    </Link>
                  </div>
                  <div className="courses-content">
                    {/* <div className="cat">
                      <i className="fal fa-graduation-cap" /> {course.category}
                    </div> */}
                    <h3>
                      <Link href={'course/' + course.slug}>{course.name}</Link>
                    </h3>
                    <p dangerouslySetInnerHTML={{ __html: course?.short_description ?? '' }} />
                    <Link href={'course/' + course.slug} className="readmore">
                      Read More <i className="fal fa-long-arrow-right" />
                    </Link>
                  </div>
                  <div className="icon">
                    <img src="assets/img/icon/cou-icon.png" alt="img" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
export default memo(CoursePage);
