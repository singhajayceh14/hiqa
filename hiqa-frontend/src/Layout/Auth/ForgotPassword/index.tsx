import React, { useEffect, memo } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { useTranslate } from '@/components/Translate';
import { REQUEST } from '@/types/interfaces';
import { useRequest, useLoading, useApp } from '@/components/App';
// import LOGO from './Components/Logo';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

function Index() {
  const { state } = useApp();
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { trans } = useTranslate();

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
                  <h3>Forgot password </h3>
                  <p>Please enter your details.</p>
                </div>
                <Formik
                  initialValues={{
                    email: '',
                  }}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validationSchema={ForgotPasswordSchema}
                  onSubmit={async (values: { email: string }) => {
                    const req = (await request('forgotPassword', values)) as REQUEST;
                    if (req.status) {
                      return router.push('/login');
                    }
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <div className="form-data">
                        <div className="forms-inputs mb-4">
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Your email address</Form.Label>
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
                        </div>

                        <div className="text-end">
                          <Button type="submit" className="btn btn-dark btnStyle2 w-100">
                            {loading?.forgotPassword_LOADING ? ButtonLoader() : trans('Verify Email')}
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
