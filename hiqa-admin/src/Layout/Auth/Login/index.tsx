import { Formik } from 'formik';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { useTranslate } from '@/components/Translate';
import AuthLayout from '@/Layout/Auth/Component/Layout';
import { REQUEST } from '@/types/interfaces';
import { validateAuthentication } from '@/utils/helpers';

// import LOGO from './Components/Logo';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(100, 'Too Long!').required('Required'),
  rememberme: Yup.boolean().required('Required'),
});

function Index() {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { trans } = useTranslate();
  const [passwordType, setPasswordType] = useState(true);

  const validateToken = useCallback(() => {
    if (validateAuthentication()) {
      if (Cookies.get('rememberme') === '1') return router.push('/dashboard');
    }
  }, [router]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content={'Login' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <AuthLayout>
        <div className="loginForm">
          <h2 className="text-capitalize">Login</h2>
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberme: false,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={LoginSchema}
            onSubmit={async (values: { subscription?: any; rememberme: boolean; email: string; password: string }) => {
              const req = (await request('LoginUser', values)) as REQUEST;
              if (req.status) {
                if (values.rememberme) Cookies.set('rememberme', '1');
                return router.push('/dashboard');
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Label>Your email address</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="email"
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
                  </Col>
                  <Col md={12}>
                    <Form.Label>Your password</Form.Label>
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
                  </Col>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Form.Group className="rememberMe">
                        <Form.Check
                          type="checkbox"
                          name="rememberme"
                          label="Remember me"
                          onChange={handleChange}
                          isInvalid={!!errors.rememberme}
                          feedback={errors.rememberme}
                          feedbackType="invalid"
                        />
                        {errors.rememberme && touched.rememberme ? (
                          <Form.Control.Feedback type="invalid">{errors.rememberme}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </div>
                    <div className="forgot">
                      <Link href="/forgot-password">Forgot password</Link>
                    </div>
                  </div>
                  <Col md={12}>
                    <Button type="submit" className="loginBtn customBtn">
                      {loading?.LoginUser_LOADING ? ButtonLoader() : trans('LOGIN')}
                    </Button>
                  </Col>
                </Row>
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
