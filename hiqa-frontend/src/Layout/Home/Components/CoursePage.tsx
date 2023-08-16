import { memo, MouseEventHandler } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { COURSE_DATA } from '@/types/interfaces';
import Modal from '@/components/Default/Modal';
import { useCommonReducer } from '@/components/App/reducer';
import { useApp } from '@/components/App';

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
  const { state } = useApp();
  const router = useRouter();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();
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

  const courseApplyModal = (course: string) => {
    const selectedCourse = course_data?.find((sm: COURSE_DATA) => sm.id == course) as any;
    const remainingCourse = course_data?.filter((sm: COURSE_DATA) => sm.id != course);

    globalDispatch({
      viewModal: true,
      selectedCourseId: [course],
      allCourse: course_data,
      selectedCourse: [selectedCourse],
      remainingCourse: remainingCourse,
    });
  };
  const closeModal = (key: string) => {
    globalDispatch({ [key]: false, selectedCourseId: [], selectedCourse: [], remainingCourse: [] });
  };
  const checkoutRedirect = (ids: number[]) => {
    if (!state?.user) {
      return router.push('/login');
    } else {
      return router.push('/checkout');
    }
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
                    <button
                      type="button"
                      onClick={() => {
                        courseApplyModal(course.id);
                      }}
                      className="cat border-0 shadow-none"
                    >
                      <i className="fal fa-graduation-cap" /> Apply Now
                    </button>
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
      <Modal
        id="courseApply"
        title={'Go to Checkout'}
        size="lg"
        show={globalState.viewModal}
        onClose={() => closeModal('viewModal')}
        className={'cartModal'}
      >
        <div className=" ">
          {globalState?.selectedCourse &&
            globalState?.selectedCourse.map((course: COURSE_DATA, index: number) => (
              <div key={index} className="alreadyAdded">
                <div className="row g-3">
                  <div className="col-auto d-lg-flex align-items-center gap-2">
                    <div className="successIcon rounded-circle overflow-hidden align-items-center justify-content-center d-none d-lg-flex"></div>
                    <div className="productImgOuter">
                      <img className="w-100 h-100" src={course.image} alt={course.name} />
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-lg">
                        <div className="content">
                          <div className="title">{course.name}</div>
                          <p
                            className="subTitle"
                            dangerouslySetInnerHTML={{ __html: course?.short_description ?? '' }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-auto col-12 d-flex align-items-center justify-content-end gap-3">
                        <div className="successIcon rounded-circle overflow-hidden d-flex align-items-center justify-content-center d-lg-none"></div>
                        <div className="second-header-btn">
                          <button
                            type="button"
                            onClick={() => {
                              checkoutRedirect(globalState.selectedCourseId);
                            }}
                            className="btn signInBtns signUpBtn"
                          >
                            <div className="txt">Go to Checkout</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {globalState?.remainingCourse && (
            <div className="otherProduct border p-3 mt-3">
              <div className="heading fs-6 fw-bold">Frequently Bought Together</div>
              <div className="productInner d-flex flex-column gap-3 mt-3">
                {globalState?.remainingCourse.map((course: COURSE_DATA, index: number) => (
                  <div key={index} className="productItem position-relative">
                    <div className="row g-3">
                      <div className="col-auto">
                        <div className="productImgOuter position-relative">
                          <div className="imgInner w-100 h-100 overflow-hidden">
                            <img className="w-100 h-100" src={course.image} alt={course.name} />
                          </div>
                          <div className="plusIcon position-absolute start-0 end-0 mx-auto d-flex align-items-center justify-content-center z-3 rounded-circle overflow-hidden shadow">
                            <img src="/assets/img/plusIcon.svg" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col d-flex gap-2">
                        <div className="content">
                          <div className="title">{course.name}</div>
                          <div className="subTitle">
                            <p dangerouslySetInnerHTML={{ __html: course?.short_description ?? '' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="totalPayment d-flex align-items-center justify-content-between mt-3">
                <div className="payment fs-5">
                  Total: <b>₹998</b>
                </div>
                <div className="second-header-btn">
                  <button
                    type="button"
                    onClick={() => {
                      checkoutRedirect(globalState.selectedCourseId);
                    }}
                    className="btn signInBtns signUpBtn"
                  >
                    <div className="txt">Go to Checkout All Course</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default memo(CoursePage);
