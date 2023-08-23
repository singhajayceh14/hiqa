import React, { memo, useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useRequest, useLoading, useApp } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import SideMenu from '@/Layout/FrontContainer/Components/SideMenu';

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(6, 'Too Short!').max(15, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(15, 'Too Long!').required('Required'),
  confirmPassword: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
    .oneOf([Yup.ref('password')], 'Password Must Match'),
});
function Index() {
  const { request, loading } = useRequest();
  const { state } = useApp();
  const { ButtonLoader } = useLoading();
  const [passwordType, setPasswordType] = useState(true);
  const [oldPasswordType, setOldPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  return (
    <>
      {state?.user ? (
        <div className="container py-lg-5 py-4">
          <div className="row">
            <SideMenu />
            <div className="col-xl-9 col-lg-8">
              <div className="card profileFormOuter overflowhidden border-0 p-4 mb-0">
                <div className="card-header bg-transparent p-0 border-0 pb-4">
                  <div className="pageTitle">Change Password</div>
                </div>
                <div className={`cmnTable`}>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      password: '',
                      confirmPassword: '',
                      oldPassword: '',
                    }}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={async (values, actions) => {
                      const res = (await request('CHANGE_PASSWORD', values)) as REQUEST;
                      if (res.status) {
                        actions.resetForm();
                      }
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                          <Col md={6}>
                            <InputGroup className="mb-3">
                              <Form.Control
                                type={oldPasswordType === true ? 'password' : 'text'}
                                name="oldPassword"
                                placeholder="Old Password"
                                onChange={handleChange}
                                value={values.oldPassword}
                                isInvalid={!!errors.oldPassword}
                              />
                              <InputGroup.Text>
                                <i
                                  role="button"
                                  className={oldPasswordType === true ? 'fa fa-eye-slash' : 'fa fa-eye'}
                                  onClick={() => setOldPasswordType(!oldPasswordType)}
                                ></i>
                              </InputGroup.Text>
                              {errors.oldPassword ? (
                                <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                              ) : null}
                            </InputGroup>
                          </Col>
                          <Col md={6}>
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
                          <Col md={6}>
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
                        </Row>
                        <Row className="mx-0">
                          <Col md={12} className="px-0 mt-3 text-end">
                            <Button type="submit" className="btn btnStyle2">
                              {loading?.CHANGE_PASSWORD_LOADING ? <ButtonLoader /> : 'Save'}
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
        </div>
      ) : (
        <ButtonLoader color="#ff7350" />
      )}
    </>
  );
}

export default memo(Index);
