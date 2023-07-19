import { memo, MouseEventHandler } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

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
const CoursePage = () => {
  const courses = [
    {
      category: 'Sciences',
      title: 'Biochemistry',
      description: 'Seamlessly visualize quality intellectual capital without superior collaboration and idea tically',
      link: '/single-courses',
      img: 'assets/img/bg/couress-img-1.jpg',
    },
    {
      category: 'Economics',
      title: 'Major in Economics',
      description: 'Seamlessly visualize quality intellectual capital without superior collaboration and idea tically',
      link: '/single-courses',
      img: 'assets/img/bg/couress-img-2.jpg',
    },
    {
      category: 'Media',
      title: 'Business Media',
      description: 'Seamlessly visualize quality intellectual capital without superior collaboration and idea tically',
      link: '/single-courses',
      img: 'assets/img/bg/couress-img-3.jpg',
    },
    {
      category: 'Public',
      title: 'Public Administration',
      description: 'Seamlessly visualize quality intellectual capital without superior collaboration and idea tically',
      link: '/single-courses',
      img: 'assets/img/bg/couress-img-4.jpg',
    },
    {
      category: 'Sciences',
      title: 'Biotechnology',
      description: 'Seamlessly visualize quality intellectual capital without superior collaboration and idea tically',
      link: '/single-courses',
      img: 'assets/img/bg/couress-img-5.jpg',
    },
    {
      category: 'Finance',
      title: 'Corporate Finance',
      description: 'Seamlessly visualize quality intellectual capital without superior collaboration and idea tically',
      link: '/single-courses',
      img: 'assets/img/bg/couress-img-6.jpg',
    },
  ];

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
                <h2>Graduate Programs</h2>
              </div>
            </div>
          </div>
          <Slider className="row class-active" {...settings}>
            {courses.map((course, index) => (
              <div key={index} className="col-lg-4 col-md-6 ">
                <div className="courses-item mb-30 hover-zoomin">
                  <div className="thumb fix">
                    <Link href={course.link}>
                      <img src={course.img} alt="contact-bg-an-01" />
                    </Link>
                  </div>
                  <div className="courses-content">
                    <div className="cat">
                      <i className="fal fa-graduation-cap" /> {course.category}
                    </div>
                    <h3>
                      <Link href={course.link}>{course.title}</Link>
                    </h3>
                    <p>{course.description}</p>
                    <Link href={course.link} className="readmore">
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
