import React, { useEffect, memo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { REQUEST } from '@/types/interfaces';
import { useRequest, useLoading, useApp } from '@/components/App';
import Link from 'next/link';
// import LOGO from './Components/Logo';

const LoginSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short!').max(15, 'Too Long!').required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
    .oneOf([Yup.ref('password')], 'Password Must Match'),
});
function Index() {
  const searchParams = useSearchParams();
  const { state } = useApp();
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  useEffect(() => {
    if (state?.user) {
      router.push('/');
    }
  }, [state?.user]);
  return state?.user ? (
    <ButtonLoader color="#ff7350" />
  ) : (
    <>
      <section className="shop-area pt-50 pb-50 p-relative" data-animation="fadeInUp animated" data-delay=".2s">
        <div className="container">
          <div className="row d-flex justify-content-center wow fadeInDown animated">
            <div className="col-xxl-5 col-lg-8">
              <div className="card p-lg-5 p-4" id="form1">
                <div
                  className="section-title center-align mb-20 text-center wow fadeInDown animated"
                  data-animation="fadeInDown"
                  data-delay=".4s"
                >
                  <h3>Reset Password</h3>
                  <p>Provide your Password.</p>
                </div>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    password: '',
                    confirmPassword: '',
                    token: '',
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values, actions) => {
                    values.token = searchParams.get('token') || '';
                    const req = (await request('RESET_PASSWORD', values)) as REQUEST;
                    actions.resetForm();
                    if (req.status) return router.push('/login');
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <div className="form-data">
                        <div className="forms-inputs mb-4">
                          <Row>
                            <Col md={12}>
                              <InputGroup className="mb-3">
                                <Form.Control
                                  type={passwordType === true ? 'password' : 'text'}
                                  name="password"
                                  placeholder="Password"
                                  onChange={handleChange}
                                  value={values.password}
                                  isInvalid={!!errors.password}
                                />
                                <InputGroup.Text>
                                  <i
                                    role="button"
                                    className={passwordType === true ? 'fa fa-eye-slash' : 'fa fa-eye'}
                                    onClick={() => setPasswordType(!passwordType)}
                                  ></i>
                                </InputGroup.Text>
                                {errors.password ? (
                                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                ) : null}
                              </InputGroup>
                            </Col>
                            <Col md={12}>
                              <InputGroup className="mb-3">
                                <Form.Control
                                  type={confirmPasswordType === true ? 'password' : 'text'}
                                  name="confirmPassword"
                                  placeholder="Confirm Password"
                                  onChange={handleChange}
                                  value={values.confirmPassword}
                                  isInvalid={!!errors.confirmPassword}
                                />
                                <InputGroup.Text>
                                  <i
                                    role="button"
                                    className={confirmPasswordType === true ? 'fa fa-eye-slash' : 'fa fa-eye'}
                                    onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                                  ></i>
                                </InputGroup.Text>
                                {errors.confirmPassword ? (
                                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                ) : null}
                              </InputGroup>
                            </Col>
                            <Col md={12}>
                              <Button type="submit" className="btn btn-dark btnStyle2 w-100">
                                {loading?.RESET_PASSWORD_LOADING ? ButtonLoader() : 'Recover my Account'}
                              </Button>
                            </Col>
                            <Col>
                              <div className="createAccount">
                                Cancel and Return to
                                <Link href="/login" className="fogotPass">
                                  {' '}
                                  Login
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
