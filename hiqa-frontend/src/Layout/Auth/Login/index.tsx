import React, { useEffect, memo, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { useTranslate } from '@/components/Translate';
import { REQUEST } from '@/types/interfaces';
import { useRequest, useLoading, useApp } from '@/components/App';
// import LOGO from './Components/Logo';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(100, 'Too Long!').required('Required'),
  rememberme: Yup.boolean().required('Required'),
});

function Index() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { trans } = useTranslate();
  const [passwordType, setPasswordType] = useState(true);
  useEffect(() => {
    if (state?.user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.user]);
  return state?.user ? (
    <ButtonLoader color="#ff7350" />
  ) : (
    <>
      <section className="shop-area pt-50 pb-50  p-relative " data-animation="fadeInUp animated" data-delay=".2s">
        <div className="container">
          <div className="row d-flex justify-content-center wow fadeInDown animated">
            <div className="col-xxl-6 col-lg-8">
              <div className="card p-lg-5 p-4" id="form1">
                <div
                  className="section-title center-align mb-50 text-center wow fadeInDown animated"
                  data-animation="fadeInDown"
                  data-delay=".4s"
                >
                  <h2>Login</h2>
                </div>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    rememberme: false,
                  }}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validationSchema={LoginSchema}
                  onSubmit={async (values: {
                    subscription?: any;
                    rememberme: boolean;
                    email: string;
                    password: string;
                  }) => {
                    const req = (await request('LoginUser', values)) as REQUEST;
                    if (req.status) {
                      dispatch({ user: req.data });
                      if (values.rememberme) Cookies.set('rememberme', '1');
                      return router.push('/');
                    }
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <div className="form-data">
                        <div className="forms-inputs mb-4">
                          <InputGroup className="mb-3">
                            <Form.Control
                              type={'email'}
                              name="email"
                              placeholder="Your email address"
                              onChange={handleChange}
                              value={values.email}
                              isInvalid={!!errors.email}
                            />
                            <InputGroup.Text>
                              <i role="button" className={'fa fa-user'}></i>
                            </InputGroup.Text>
                            {errors.email && touched.email ? (
                              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            ) : null}
                          </InputGroup>
                        </div>
                        <div className="forms-inputs mb-4">
                          <InputGroup className="mb-3">
                            <Form.Control
                              type={passwordType === true ? 'password' : 'text'}
                              name="password"
                              placeholder="Your password"
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
                            {errors.password && touched.password ? (
                              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            ) : null}
                          </InputGroup>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <Form.Group className="rememberMe">
                              <Form.Check
                                type="checkbox"
                                name="rememberme"
                                label="Remember me"
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </div>
                          <div className="forgot">
                            <Link href="/forgot-password">Forgot password</Link>
                          </div>
                        </div>
                        <div className="text-end">
                          <Button type="submit" className="btn btn-dark btnStyle2 w-100">
                            {loading?.LoginUser_LOADING ? ButtonLoader() : trans('LOGIN')}
                          </Button>
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
