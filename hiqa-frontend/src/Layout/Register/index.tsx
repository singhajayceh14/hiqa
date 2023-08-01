import React, { memo, useState } from 'react';
import Head from 'next/head';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Steps, useSteps } from 'react-step-builder';

import { REQUEST, USER_DATA, QUALIFICATION, COURSE_DATA } from '@/types/interfaces';
import FrontContainer from '@/Layout/FrontContainer';
import { toastr } from '@/utils/helpers';
import { useApp, useRequest } from '@/components/App';
import GoogleAutoComplete from '@/components/Default/Maps/Autocomplete';
import CustomAutomplete from '@/components/Default/Autocomplete';

const initialValues: USER_DATA = {
  fullName: '',
  fatherName: '',
  email: '',
  mobile: '',
  gender: '',
  dob: '',
  address: '',
  zipcode: '',
  image: '',
  latitude: '',
  longitude: '',
  country: '',
  state: '',
  city: '',
  qualification: [],
  qualificationId: [],
  qualificationDoc: {},
  courseId: [],
  course: [],
};
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  fatherName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function Index() {
  const router = useRouter();
  const { state } = useApp();
  const { request, loading } = useRequest();
  const { prev, next, total, current } = useSteps();
  const [fileData, setfileData] = useState<{
    file: File | null;
    preView: string;
  }>({
    file: null,
    preView: '/assets/images/user-profile.png',
  });

  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
    if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    setfileData({
      file: file,
      preView: URL.createObjectURL(file),
    });
  };

  const getQualification = (q: string) => {
    if (q.toLowerCase() == '12th') {
      return (
        <>
          <option value="appraing">Appraing</option>
          <option value="passout">Passout</option>
        </>
      );
    }
    if (q.toLowerCase() == 'iti') {
      return (
        <>
          <option value="1st">1 Year</option>
          <option value="2nd">2 Year</option>
          <option value="3nd">3 Year</option>
        </>
      );
    }
    if (q.toLowerCase() == 'dip') {
      return (
        <>
          <option value="1st">1 Year</option>
          <option value="2nd">2 Year</option>
          <option value="3nd">3 Year</option>
        </>
      );
    }
    if (q.toLowerCase() == 'b.sc') {
      return (
        <>
          <option value="1st">1 Year</option>
          <option value="2nd">2 Year</option>
          <option value="3nd">3 Year</option>
        </>
      );
    }
    if (q.toLowerCase() == 'be') {
      return (
        <>
          <option value="1st">1 Year</option>
          <option value="2nd">2 Year</option>
          <option value="3nd">3 Year</option>
        </>
      );
    }
    if (q.toLowerCase() == 'me') {
      return (
        <>
          <option value="1st">1 Year</option>
          <option value="2nd">2 Year</option>
          <option value="3nd">3 Year</option>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content={'Register' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <section className="shop-area pt-50 pb-50  p-relative " data-animation="fadeInUp animated" data-delay=".2s">
        <div className="container">
          <div className="row d-flex justify-content-center wow fadeInDown animated">
            <div
              className="section-title center-align  text-center wow fadeInDown animated"
              data-animation="fadeInDown"
              data-delay=".4s"
            >
              <h4 className="text-capitalize">Registration Form</h4>
            </div>
            <div className="col-md-12">
              <div className="card px-5 py-5" id="form1">
                <Formik
                  initialValues={initialValues}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validationSchema={RegisterSchema}
                  onSubmit={async values => {
                    console.log(values);
                    const formData: FormData = new FormData();
                    if (fileData.file) {
                      formData.append('image', fileData.file);
                    }
                    formData.append('fullName', values.fullName);
                    formData.append('fatherName', values.fatherName);
                    formData.append('email', values.email);
                    formData.append('gender', values.gender);
                    formData.append('dob', values.dob);
                    formData.append('address', values.address);
                    formData.append('zipcode', values.zipcode);

                    if (request) {
                      // const req = (await request('addBanner', formData)) as REQUEST;
                      // if (req.status) {
                      //   router.push('/banner');
                      // }
                    }
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <div className="steps_wrapper">
                        <Steps>
                          <div className="step">
                            <Row>
                              <div
                                className="section-title wow fadeInDown animated"
                                data-animation="fadeInDown"
                                data-delay=".4s"
                              >
                                <h4 className="text-capitalize">Personal Information</h4>
                              </div>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Full Name *</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="fullName"
                                    placeholder="Your full name"
                                    onChange={handleChange}
                                    value={values.fullName}
                                    isInvalid={!!errors.fullName}
                                  />
                                  {errors.fullName && touched.fullName ? (
                                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Father's Name *</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="fatherName"
                                    placeholder="Your father's name"
                                    onChange={handleChange}
                                    value={values.fatherName}
                                    isInvalid={!!errors.fatherName}
                                  />
                                  {errors.fatherName && touched.fatherName ? (
                                    <Form.Control.Feedback type="invalid">{errors.fatherName}</Form.Control.Feedback>
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
                                  <Form.Check
                                    inline
                                    label="Male"
                                    name="gender"
                                    type="radio"
                                    id="inline-male"
                                    value="Male"
                                    checked={values.gender === 'Male'}
                                    onChange={handleChange}
                                  />
                                  <Form.Check
                                    inline
                                    label="Female"
                                    name="gender"
                                    type="radio"
                                    id="inline-female"
                                    value="Female"
                                    checked={values.gender === 'Female'}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                          <div className="step">
                            <Row>
                              <div
                                className="section-title wow fadeInDown animated"
                                data-animation="fadeInDown"
                                data-delay=".4s"
                              >
                                <h4 className="text-capitalize">Address Information</h4>
                              </div>
                              <Col md={12}>
                                <Form.Group className="mb-3">
                                  <GoogleAutoComplete
                                    name="address"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Enter Address *"
                                    onChange={handleChange}
                                    value={values.address}
                                    isInvalid={!!errors.address}
                                    onSelectOption={address => {
                                      console.log(address);
                                      setFieldValue('address', address.formattedAddress, true);
                                      setFieldValue('latitude', address.lat, true);
                                      setFieldValue('longitude', address.lng, true);
                                      setFieldValue('state', address.state, true);
                                      setFieldValue('country', address.country, true);
                                      setFieldValue('city', address.city, true);
                                      setFieldValue('zipcode', address.postalCode, true);
                                    }}
                                  />
                                  {errors.address && touched.address ? (
                                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label htmlFor="state">City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="city"
                                    readOnly={true}
                                    placeholder="Your city"
                                    value={values.city}
                                    isInvalid={!!errors.city}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label htmlFor="state">State</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="state"
                                    readOnly={true}
                                    placeholder="Your State"
                                    value={values.state}
                                    isInvalid={!!errors.state}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label htmlFor="country">Country </Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="country"
                                    readOnly={true}
                                    placeholder="Your Country"
                                    value={values.country}
                                    isInvalid={!!errors.country}
                                  />
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
                            </Row>
                          </div>
                          <div className="step">
                            <Row>
                              <div
                                className="section-title wow fadeInDown animated"
                                data-animation="fadeInDown"
                                data-delay=".4s"
                              >
                                <h4 className="text-capitalize">Qualification Information</h4>
                              </div>
                              <Col md={12}>
                                <Form.Group className="mb-3">
                                  <CustomAutomplete
                                    label={'Select Qualification'}
                                    placeholder={'Select Qualification'}
                                    type="text"
                                    loading={false}
                                    // onClick={() => disabledPairedFields()}
                                    clearOption={() => {
                                      setFieldValue('qualification', []);
                                    }}
                                    name={'qualification'}
                                    multiple={true}
                                    onMultipleSelect={selected => {
                                      setFieldValue('qualification', [...selected.map(mp => mp.name)]);
                                      const quoteUsersIds = selected.map(mp => {
                                        if (state?.qualification) {
                                          return state?.qualification?.find((sm: QUALIFICATION) => sm.name === mp.name)
                                            ?.id;
                                        }
                                      });
                                      setFieldValue('qualificationId', [...quoteUsersIds]);
                                    }}
                                    onSelect={(e, val) => val.name as string}
                                    isOptionsEmpty={false}
                                    filter={true} //If not remote
                                    //Provide only if we want to render a value again
                                    values={values.qualification?.map((mp: string) => ({ name: mp })) || []}
                                    data={state?.qualification}
                                    filterfrom={val => val.name as string}
                                    getvalue={val => val.name as string}
                                    renderValue={val =>
                                      state?.qualification?.find((vl: QUALIFICATION) => vl.name === val)?.name || ''
                                    }
                                  />
                                </Form.Group>
                                {values.qualification ? (
                                  <Table striped bordered hover>
                                    <tbody>
                                      {values.qualification.map((q: string, index: number) => (
                                        <tr key={index}>
                                          <td>
                                            <Form.Control
                                              type="text"
                                              name={`qualificationDoc[${q.toLowerCase()}].name`}
                                              placeholder={`Your ${q} Institute Name`}
                                              onChange={handleChange}
                                              value={values.qualificationDoc?.[q.toLowerCase()]?.name || ''}
                                            />
                                          </td>
                                          <td>
                                            <Form.Select
                                              onChange={handleChange}
                                              name={`qualificationDoc[${q.toLowerCase()}].year`}
                                              value={values.qualificationDoc?.[q.toLowerCase()]?.year || ''}
                                            >
                                              <option>Select Year</option>
                                              {getQualification(q)}
                                            </Form.Select>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                ) : null}
                              </Col>
                            </Row>
                          </div>
                          <div className="step">
                            <Row>
                              <div
                                className="section-title center-align  text-center wow fadeInDown animated"
                                data-animation="fadeInDown"
                                data-delay=".4s"
                              >
                                <h4 className="text-capitalize">Select Course</h4>
                              </div>
                              <Col md={12}>
                                <Form.Group className="mb-3">
                                  <CustomAutomplete
                                    label={'Select Course'}
                                    placeholder={'Select Course'}
                                    type="text"
                                    loading={false}
                                    // onClick={() => disabledPairedFields()}
                                    clearOption={() => {
                                      setFieldValue('course', []);
                                    }}
                                    name={'course'}
                                    multiple={true}
                                    onMultipleSelect={selected => {
                                      setFieldValue('course', [...selected.map(mp => mp.name)]);
                                      const quoteUsersIds = selected.map(mp => {
                                        if (state.courseList) {
                                          return state.courseList?.find((sm: COURSE_DATA) => sm.name === mp.name)?.id;
                                        }
                                      });
                                      setFieldValue('courseId', [...quoteUsersIds]);
                                    }}
                                    onSelect={(e, val) => val.name as string}
                                    isOptionsEmpty={false}
                                    filter={true} //If not remote
                                    //Provide only if we want to render a value again
                                    values={values.course?.map((mp: string) => ({ name: mp })) || []}
                                    data={state.courseList}
                                    filterfrom={val => val.name as string}
                                    getvalue={val => val.name as string}
                                    renderValue={val =>
                                      state.courseList?.find((vl: COURSE_DATA) => vl.name === val)?.name || ''
                                    }
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        </Steps>
                        <Row>
                          <Col md={12}>
                            <div className="d-flex justify-content-between navigation">
                              <Button
                                type="button"
                                className={current === 1 ? 'btn signInBtns d-none' : 'btn signInBtns '}
                                onClick={prev}
                              >
                                Prev
                              </Button>
                              <Button
                                type="button"
                                className={current === total ? 'btn signInBtns d-none' : 'btn signInBtns'}
                                onClick={next}
                              >
                                Next
                              </Button>
                              <Button
                                type="submit"
                                className={current === total ? 'btn signInBtns' : 'btn signInBtns d-none'}
                              >
                                Register
                              </Button>
                            </div>
                          </Col>
                        </Row>
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
