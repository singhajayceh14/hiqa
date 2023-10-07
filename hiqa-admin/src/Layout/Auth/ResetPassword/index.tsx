import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import AuthLayout from '@/Layout/Auth/Component/Layout';
import { REQUEST } from '@/types/interfaces';
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
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content={'Reset Password' || '247torax'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <AuthLayout>
        <div className="loginForm">
          <h2>Reset Password</h2>
          <p>Provide your Password.</p>
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
                        <Button type="submit" className="loginBtn customBtn">
                          {loading?.RESET_PASSWORD_LOADING ? ButtonLoader() : 'Recover my Account'}
                        </Button>
                      </Col>
                      <Col>
                        <div className="createAccount">
                          Cancel and Return to{' '}
                          <Link href="/login" className="fogotPass">
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
      </AuthLayout>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
