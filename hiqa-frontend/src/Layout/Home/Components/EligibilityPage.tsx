import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { Steps, useSteps } from 'react-step-builder';
import { useRouter } from 'next/navigation';

import { useApp, useRequest } from '@/components/App';
import { REQUEST, COURSE_DATA, QUALIFICATION } from '@/types/interfaces';

function EligibilityPage() {
  const { state } = useApp();
  const { request } = useRequest();
  const { next, total, current } = useSteps();
  const [course, setCourse] = useState([]);
  const router = useRouter();

  const initialize = useCallback(async (qualificationId?: string) => {
    const res: any = (await request('CheckEligibility', {
      qualificationId: qualificationId ?? '',
    })) as REQUEST;
    if (res?.status) {
      setCourse(res?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);
  console.log(state);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          qualificationId: '',
        }}
        onSubmit={async values => {
          router.push('/register');
        }}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
          <Form noValidate onSubmit={handleSubmit} className="contact-form mt-10 text-center">
            <div className="steps_wrapper">
              <Steps>
                <div className="step">
                  <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                    <h4 className="text-capitalize">Select Your Qualification</h4>
                  </div>
                  <Row>
                    <Col md={12}>
                      <div className="qualification-list">
                        {state?.qualification?.map((items: QUALIFICATION, index: number) => (
                          <label key={index} className="single-course">
                            <input type="radio" name="qualificationId" value={items.id} onChange={handleChange} />

                            <span className="checkmark"></span>
                            <div className="qualific-dtl">
                              <div className="qua-ic">
                                <img src={items.image} alt={items.name} />
                              </div>
                              <div className="qualification-name">
                                <h5>{items.name} </h5>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="step">
                  <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                    <h4 className="text-capitalize">Hey you are Eligible for following course!!</h4>
                  </div>
                  <Row>
                    <Col md={12}>
                      <div className="modal-course-sec">
                        <div className="course_listing_wrap">
                          {course.map((course: COURSE_DATA, index: number) => (
                            <div key={index} className="course-col">
                              <label className="single-course">
                                <input type="checkbox" name="courseId" />
                                <span className="checkmark"></span>
                                <div className="d-flex">
                                  <div className="course-img">
                                    <img src={course.image} alt={course.name} />
                                  </div>
                                  <div className="course-cont">
                                    <h3>{course.name}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: course?.short_description ?? '' }} />
                                    <div className="course-price-cls">
                                      <h5>
                                        {course?.price !== course?.discount_price ? (
                                          <span className="line-through">₹ {course?.price}</span>
                                        ) : null}
                                        ₹ {course?.discount_price}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Steps>
              <hr />
              <Row>
                <Col md={12}>
                  <div className="model-footer">
                    <div className="d-flex flex-wrap justify-content-end w-100 align-items-center">
                      <Button
                        type="button"
                        onClick={() => {
                          initialize(values.qualificationId);
                          next();
                        }}
                        className={current === total ? 'btn btnStyle2 d-none' : 'btn btnStyle2'}
                      >
                        Next
                      </Button>
                      <Button type="submit" className={current === total ? 'btn btnStyle2' : 'btn btnStyle2 d-none'}>
                        Register Now
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default memo(EligibilityPage);
