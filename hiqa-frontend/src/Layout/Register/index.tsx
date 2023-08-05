import React, { memo, useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Steps, useSteps } from 'react-step-builder';

import { REQUEST, USER_DATA, QUALIFICATION, COURSE_DATA, COURSE } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';
import { useApp, useLoading, useRequest } from '@/components/App';
import GoogleAutoComplete from '@/components/Default/Maps/Autocomplete';
import CustomAutomplete from '@/components/Default/Autocomplete';
import styles from '@/styles/Components/Profile/Profile.module.scss';
import Modal from '@/components/Default/Modal';

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
  category: '',
};
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  fatherName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function Index() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { ButtonLoader } = useLoading();
  const { request, loading } = useRequest();
  const { prev, next, total, current } = useSteps();
  const [fileData, setfileData] = useState<{
    file: File | null;
    preView: string;
  }>({
    file: null,
    preView: '/assets/images/user-profile.png',
  });
  useEffect(() => {
    if (state?.user) {
      router.push('/');
    }
  }, [state?.user]);
  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
    if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    setfileData({
      file: file,
      preView: URL.createObjectURL(file),
    });
  };

  const onDocChange = async (event: any, name: string) => {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);
    const req = (await request('docUpload', formData)) as REQUEST;
    if (req.status) {
      //router.push('/banner');
      const resData: any = req.data;
      return resData;
    }
    return '';
  };
  const closeModal = (key: string) => {
    dispatch({ [key]: false });
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

  const getCourseList = useCallback(async (q: string[]) => {
    const req = (await request('courseList', { q: q.toString() })) as REQUEST;
    if (req.status) {
      //router.push('/banner');
      const resData: any = req.data;
      dispatch({ courseList: resData.courses_list });
    }
  }, []);
  return state?.user ? (
    <ButtonLoader color="#ff7350" />
  ) : (
    <>
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
            <div className="col-xxl-8 col-lg-8 ">
              <div className="card p-lg-5 p-4 profileFormOuter" id="form1">
                <Formik
                  enableReinitialize={true}
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
                    let qualificationDoc = JSON.stringify(values.qualificationDoc);
                    for (var key in values) {
                      console.log(key);
                      if (key === 'qualificationDoc') {
                        formData.append('qualificationDoc', qualificationDoc);
                      } else {
                        formData.append(key, values[key]);
                      }
                    }
                    console.log(formData);
                    if (request) {
                      const req = (await request('register', formData)) as REQUEST;
                      if (req.status) {
                        dispatch({ viewModal: true });
                      }
                    }
                  }}
                >
                  {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
                    <Form noValidate onSubmit={handleSubmit} className="customForm">
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
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Category</Form.Label>
                                  <Form.Select onChange={handleChange} name={`category`} value={values.category}>
                                    <option>Select Year</option>
                                    <option value={'gen'}>General</option>
                                    <option value={'sc'}>SC</option>
                                    <option value={'st'}>ST</option>
                                    <option value={'obc'}>OBC</option>
                                  </Form.Select>
                                  {errors.dob && touched.dob ? (
                                    <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <div className={`${styles.companyProfile} d-flex align-items-center`}>
                                  <span className={`${styles.companyImg} position-relative`}>
                                    <span className={`${styles.imgOuter} w-100 h-100 rounded-circle overflow-hidden`}>
                                      <img
                                        onError={({ currentTarget }) => {
                                          currentTarget.onerror = null; // prevents looping
                                          currentTarget.src = '/assets/images/user-profile.png';
                                        }}
                                        src={fileData.preView}
                                        alt="user-profile"
                                      />
                                    </span>
                                    <div className={styles.companyInformation}>
                                      <input
                                        accept="image/png, image/gif, image/jpeg, image/jpg, image/bmp"
                                        className={'form-control '}
                                        id="chooseProfilePicture"
                                        type="file"
                                        onChange={onFileChange}
                                        style={{ display: 'none' }}
                                      />

                                      <label
                                        htmlFor="chooseProfilePicture"
                                        className="form-label position-absolute uploadImgBtn rounded-circle p-1 m-0 d-flex align-items-center justify-content-center bottom-0 end-0 mb-md-1 me-md-1"
                                      >
                                        <i style={{ color: '#fff', fontSize: '12px' }} className="fa fa-pencil"></i>
                                      </label>
                                    </div>
                                  </span>
                                </div>
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
                                      getCourseList(quoteUsersIds);
                                      setFieldValue('qualificationId', [...quoteUsersIds]);
                                    }}
                                    onSelect={(e, val) => {
                                      return val.name as string;
                                    }}
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
                                          <td>
                                            <Form.Group controlId="formFile">
                                              <Form.Control
                                                type="file"
                                                onChange={async event => {
                                                  const res = await onDocChange(event, q.toLowerCase());
                                                  setFieldValue(`qualificationDoc[${q.toLowerCase()}].docs`, res);
                                                }}
                                              />
                                            </Form.Group>
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
                                className={current === 1 ? 'btn btnStyle2 d-none' : 'btn btnStyle2 '}
                                onClick={prev}
                              >
                                Prev
                              </Button>
                              <Button
                                type="button"
                                className={current === total ? 'btn btnStyle2 d-none' : 'btn btnStyle2'}
                                onClick={next}
                              >
                                Next
                              </Button>
                              <Button
                                type="submit"
                                className={current === total ? 'btn btnStyle2' : 'btn btnStyle2 d-none'}
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
      <Modal id="thankYou" title={'Thank You'} size="lg" show={state.viewModal} onClose={() => closeModal('viewModal')}>
        <div className="container" style={{ width: 500 }}>
          <h5>Thank You</h5>
        </div>
      </Modal>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
