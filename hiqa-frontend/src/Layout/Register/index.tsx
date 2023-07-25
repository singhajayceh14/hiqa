import React, { memo } from 'react';
import Head from 'next/head';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FrontContainer from '@/Layout/FrontContainer';

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string().required(),
  fathername: Yup.string().required(),
  email: Yup.string().email('Invalid email').required('Required'),
  zipcode: Yup.string().min(3, 'Too Short!').max(10, 'Too Long!').required('Required'),
});

function Index() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content={'Register' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        <section className="shop-area pt-50 pb-50  p-relative " data-animation="fadeInUp animated" data-delay=".2s">
          <div className="container">
            <div className="row d-flex justify-content-center wow fadeInDown animated">
              <div className="col-md-12">
                <div className="card px-5 py-5" id="form1">
                  <div
                    className="section-title center-align mb-50 text-center wow fadeInDown animated"
                    data-animation="fadeInDown"
                    data-delay=".4s"
                  >
                    <h2 className="text-capitalize">Registration Now</h2>
                  </div>
                  <Formik
                    initialValues={{
                      fullname: '',
                      fathername: '',
                      email: '',
                      mobile: '',
                      gender: '',
                      dob: '',
                      address: '',
                      zipcode: '',
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values: {
                      fullname: string;
                      fathername: string;
                      email: string;
                      mobile: string;
                      gender: string;
                      dob: string;
                      address: string;
                      zipcode: string;
                    }) => {
                      alert(JSON.stringify(values, null, 2));
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="fullname"
                                placeholder="Your first name"
                                onChange={handleChange}
                                value={values.fullname}
                                isInvalid={!!errors.fullname}
                              />
                              {errors.fullname && touched.fullname ? (
                                <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Father's Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="fathername"
                                placeholder="Your father's name"
                                onChange={handleChange}
                                value={values.fathername}
                                isInvalid={!!errors.fathername}
                              />
                              {errors.fathername && touched.fathername ? (
                                <Form.Control.Feedback type="invalid">{errors.fathername}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                onChange={handleChange}
                                value={values.email}
                                isInvalid={!!errors.email}
                              />
                              {errors.email && touched.email ? (
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Mobile</Form.Label>
                              <Form.Control
                                type="text"
                                name="mobile"
                                placeholder="Your mobile no."
                                onChange={handleChange}
                                value={values.mobile}
                                isInvalid={!!errors.mobile}
                              />
                              {errors.mobile && touched.mobile ? (
                                <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control
                                type="date"
                                name="dob"
                                placeholder=""
                                onChange={handleChange}
                                value={values.dob}
                                isInvalid={!!errors.dob}
                              />
                              {errors.dob && touched.dob ? (
                                <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Label htmlFor="formGender">Gender</Form.Label>
                            <Form.Group className="mb-3" controlId="formGender" id="formGender">
                              <Form.Check inline label="Male" name="gender" type="radio" id="inline-male" />
                              <Form.Check inline label="Female" name="gender" type="radio" id="inline-female" />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="country">Country </Form.Label>
                              <Form.Select id="country">
                                <option value="ind">India</option>
                                <option value="us">US</option>
                                <option value="uk">UK</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="state">State</Form.Label>
                              <Form.Select id="state">
                                <option value="up">Uttar Pradesh</option>
                                <option value="ot">Other</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="address"
                                placeholder="Your permanant address"
                                onChange={handleChange}
                                value={values.address}
                                isInvalid={!!errors.address}
                              />
                              {errors.address && touched.address ? (
                                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Postal Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="zipcode"
                                placeholder="Your postal code / zipcode"
                                onChange={handleChange}
                                value={values.zipcode}
                                isInvalid={!!errors.zipcode}
                              />
                              {errors.zipcode && touched.zipcode ? (
                                <Form.Control.Feedback type="invalid">{errors.zipcode}</Form.Control.Feedback>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Button type="submit" className="loginBtn">
                              Register
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FrontContainer>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
