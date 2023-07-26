import { memo, MouseEventHandler } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { COURSE_DATA } from '@/types/interfaces';
import Modal from '@/components/Default/Modal';
import { useCommonReducer } from '@/components/App/reducer';
import CustomAutomplete from '@/components/Default/Autocomplete';

const FormikSchema = Yup.object().shape({
  course: Yup.array()
    .of(Yup.string())
    .min(1, 'Course is required!')
    .max(50, 'Course is required!')
    .required('Required'),
});
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
  const { state, dispatch } = useCommonReducer();

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
    const selectedCourse = course_data?.find((sm: COURSE_DATA) => sm.id == course)?.name;
    dispatch({
      viewModal: true,
      selectedCourseId: [course],
      allCourse: course_data,
      selectedCourseName: [selectedCourse],
    });
  };
  const closeModal = (key: string) => {
    dispatch({ [key]: false, selectedCourseId: [], selectedCourseName: [] });
  };
  const intitalValues = {
    course: state?.selectedCourseName || [],
    courseId: state?.selectedCourseId || [],
  };
  console.log(intitalValues);
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
                    <div
                      onClick={() => {
                        courseApplyModal(course.id);
                      }}
                      className="cat"
                    >
                      <i className="fal fa-graduation-cap" /> Apply Now
                    </div>
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
        title={'Course Apply'}
        size="lg"
        show={state.viewModal}
        onClose={() => closeModal('viewModal')}
      >
        <div className="container" style={{ width: 500 }}>
          <Formik
            enableReinitialize={true}
            initialValues={intitalValues}
            validationSchema={FormikSchema}
            onSubmit={async values => {
              console.log(intitalValues, values);
            }}
          >
            {({ handleSubmit, handleReset, values, errors, setFieldValue }) => (
              <Form noValidate onSubmit={handleSubmit} onReset={handleReset}>
                <Row>
                  <Col md={12}>
                    <CustomAutomplete
                      label={'Select Course'}
                      placeholder={'Select Course'}
                      type="text"
                      loading={false}
                      // onClick={() => disabledPairedFields()}
                      clearOption={() => {
                        setFieldValue('course', []);
                      }}
                      name={'course'}
                      multiple={true}
                      onMultipleSelect={selected => {
                        setFieldValue('course', [...selected.map(mp => mp.name)]);
                        const quoteUsersIds = selected.map(mp => {
                          if (state.allCourse) {
                            return state.allCourse?.find((sm: COURSE_DATA) => sm.name === mp.name)?.id;
                          }
                        });
                        setFieldValue('courseId', [...quoteUsersIds]);
                      }}
                      onSelect={(e, val) => val.name as string}
                      isOptionsEmpty={false}
                      filter={true} //If not remote
                      //Provide only if we want to render a value again
                      values={values.course?.map((mp: string) => ({ name: mp })) || []}
                      data={state.allCourse}
                      filterfrom={val => val.name as string}
                      getvalue={val => val.name as string}
                      renderValue={val => state.allCourse?.find((vl: COURSE_DATA) => vl.name === val)?.name || ''}
                    />
                    {errors.course ? <Form.Text className="text-danger">{errors.course as string}</Form.Text> : null}
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Button type="submit" className="btn ss-btn" data-animation="fadeInRight" data-delay=".8s">
                      Apply Now <i className="fal fa-long-arrow-right" />
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
export default memo(CoursePage);
