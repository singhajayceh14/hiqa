import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import styles from '@/styles/Components/Address/Address.module.scss';
import { REQUEST, USER_PROPS } from '@/types/interfaces';
import { useRequest, useLoading } from '@/components/App';
import { phoneRegExp } from '@/utils/helpers';

const FormikSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid Phone')
    .min(9, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(15, 'Too Long!').required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
    .oneOf([Yup.ref('password')], 'Password Must Match'),
});

const EidtFormikSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid Phone')
    .min(9, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
});

function UserForm(props: USER_PROPS) {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state } = props;
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: (state?.userDetail?.name || '') as string,
        email: (state?.userDetail?.email || '') as string,
        phone: (state?.userDetail?.mobile_number || '') as string,
        password: '',
        confirmPassword: '',
      }}
      validationSchema={props?.edit ? EidtFormikSchema : FormikSchema}
      onSubmit={async values => {
        const payload = {
          name: values.name,
          email: values.email,
          mobile_number: values.phone,
          password: values.password,
        };
        if (request) {
          if (props?.edit) {
            const req = (await request('updateUser', {
              ...payload,
              id: state?.userDetail?.id,
            })) as REQUEST;
            if (req.status) {
              router.push('/user');
            }
          } else {
            const req = (await request('addUser', payload)) as REQUEST;
            if (req.status) {
              router.push('/user');
            }
          }
        }
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit} id="addForm">
          <div className={styles.formField}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    isInvalid={!!errors.name}
                  />
                  {errors.name ? <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>

              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Email *'}</Form.Label>
                  <Form.Control
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    isInvalid={!!errors.email}
                  />
                  {errors?.email ? <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    placeholder="Phone Number"
                    name="phone"
                    type="text"
                    onChange={handleChange}
                    value={values.phone}
                    isInvalid={!!errors.phone}
                  />
                  {errors.phone ? <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>
              {props?.edit ? null : (
                <>
                  {' '}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{'Password *'}</Form.Label>
                      <InputGroup className="mb-3">
                        <Form.Control
                          type={passwordType == true ? 'password' : 'text'}
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
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>{'Confirm Password *'}</Form.Label>

                      <InputGroup className="mb-3">
                        <Form.Control
                          type={confirmPasswordType == true ? 'password' : 'text'}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                          value={values.confirmPassword}
                          isInvalid={!!errors.confirmPassword}
                        />
                        <InputGroup.Text>
                          <i
                            role="button"
                            className={confirmPasswordType == true ? 'fa fa-eye-slash' : 'fa fa-eye'}
                            onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                          ></i>
                        </InputGroup.Text>
                        {errors.confirmPassword ? (
                          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                    </Form.Group>
                  </Col>{' '}
                </>
              )}
            </Row>
          </div>
          <Row>
            <Col md={1}>
              <Button
                disabled={Boolean(Object.keys(errors).length)}
                size="sm"
                type="submit"
                className="loginBtn customBtn"
              >
                {loading?.addUser_LOADING ? ButtonLoader() : props.edit ? 'Update' : 'Save'}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
