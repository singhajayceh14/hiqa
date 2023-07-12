import React, { useCallback, useEffect, memo } from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import AuthLayout from '@/Layout/Auth/Component/Layout';
import { useTranslate } from '@/components/Translate';
import { REQUEST } from '@/types/interfaces';
import { useRequest, useLoading } from '@/components/App';
import { validateAuthentication } from '@/utils/helpers';
import { useWebPush } from '@/components/WebPush';

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
  const { getSubscriptionBodyToken } = useWebPush();

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
        <meta name="description" content={'Login' || 'Xyyper'} />
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
              const subscription = await getSubscriptionBodyToken();
              if (subscription) values['subscription'] = subscription;
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
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Your password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Your password"
                        onChange={handleChange}
                        value={values.password}
                        isInvalid={!!errors.password}
                      />
                      {errors.password && touched.password ? (
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <div className="rememberPass d-flex justify-content-between">
                    <div className="d-flex">
                      <Form.Group className="tableCheck" controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          name="rememberme"
                          onChange={handleChange}
                          isInvalid={!!errors.rememberme}
                          feedback={errors.rememberme}
                          feedbackType="invalid"
                        />
                        {errors.rememberme && touched.rememberme ? (
                          <Form.Control.Feedback type="invalid">{errors.rememberme}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <span>Remember Me</span>
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
