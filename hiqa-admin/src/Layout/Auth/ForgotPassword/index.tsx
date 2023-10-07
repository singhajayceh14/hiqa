import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as Yup from 'yup';

import { useLoading, useRequest } from '@/components/App';
import { useTranslate } from '@/components/Translate';
import AuthLayout from '@/Layout/Auth/Component/Layout';
import { REQUEST } from '@/types/interfaces';

// import LOGO from './Components/Logo';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

function Index() {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { trans } = useTranslate();

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content={'Forgot Password' || '247torax'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <AuthLayout>
        <div className="loginForm">
          <h2>Forgot password </h2>
          <p>Please enter your details.</p>
          <Formik
            initialValues={{
              email: '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={LoginSchema}
            onSubmit={async values => {
              const req = (await request('forgotPassword', values)) as REQUEST;
              if (req.status) {
                return router.push('/login');
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
                    <Button type="submit" className="loginBtn customBtn">
                      {loading?.LoginUser_LOADING ? ButtonLoader() : trans('Verify Email')}
                    </Button>
                  </Col>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="forgot">
                      Cancel and Return to <Link href="/login">Login</Link>
                    </div>
                  </div>
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
