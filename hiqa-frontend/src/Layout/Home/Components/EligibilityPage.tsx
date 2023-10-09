import React, { memo, useCallback, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { useApp, useRequest } from '@/components/App';
import { REQUEST, COURSE_DATA, QUALIFICATION } from '@/types/interfaces';
import CustomAutomplete from '@/components/Default/Autocomplete';

function EligibilityPage() {
  const { state } = useApp();
  const { request } = useRequest();
  const [course, setCourse] = useState([]);

  const initialize = useCallback(async () => {
    const res: any = (await request('CheckEligibility', {
      qualificationId: '',
    })) as REQUEST;
    if (res?.status) {
      setCourse(res?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          qualification: [],
          qualificationId: [],
        }}
        onSubmit={async values => {
          const res: any = (await request('CheckEligibility', {
            qualificationId: values.qualificationId.toString(),
          })) as REQUEST;
          if (res?.status) {
            localStorage.setItem('qualification', values.qualificationId.toString());
            setCourse(res?.data);
          }
        }}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
          <Form noValidate onSubmit={handleSubmit} className="contact-form mt-10 text-center">
            <div key={234234234234} className="row">
              <div className="col-md-8">
                <div className="contact-field p-relative c-name mb-10">
                  <Form.Group className="mb-3">
                    <CustomAutomplete
                      label={'Select Qualification'}
                      labelHidden={true}
                      placeholder={'Select Qualification'}
                      type="text"
                      loading={false}
                      // onClick={() => disabledPairedFields()}
                      clearOption={() => {
                        setFieldValue('qualification', []);
                      }}
                      name={'qualification'}
                      multiple={true}
                      onMultipleSelect={selected => {
                        setFieldValue('qualification', [...selected.map(mp => mp.name)]);
                        const quoteUsersIds = selected.map(mp => {
                          if (state.qualification) {
                            return state.qualification?.find((sm: QUALIFICATION) => sm.name === mp.name)?.id;
                          }
                        });
                        setFieldValue('qualificationId', [...quoteUsersIds]);
                      }}
                      onSelect={(e, val) => {
                        return val.name as string;
                      }}
                      isOptionsEmpty={false}
                      filter={true} //If not remote
                      //Provide only if we want to render a value again
                      values={values.qualification?.map((mp: string) => ({ name: mp })) || []}
                      data={state.qualification || []}
                      filterfrom={val => val.name as string}
                      getvalue={val => val.name as string}
                      renderValue={val => state.qualification?.find((vl: QUALIFICATION) => vl.name === val)?.name || ''}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="col-md-4">
                <Button type="submit" className="btn ss-btn" data-animation="fadeInRight" data-delay=".8s">
                  Check Eligibility <i className="fal fa-long-arrow-right" />
                </Button>
              </div>
            </div>
            <div className="modal-course-sec">
              <h2>Course List</h2>
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
                              <span className="line-through">₹ {course?.price}</span> ₹{course?.discount_price}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="model-footer">
              <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
                <div className="course-no">
                  <h5 className="mb-0">2 All Course</h5>
                </div>
                <div className="course-add-to-cart">
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div> */}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default memo(EligibilityPage);
