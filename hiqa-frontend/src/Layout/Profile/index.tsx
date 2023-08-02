import React, { useCallback, useEffect, memo } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Accordion from 'react-bootstrap/Accordion';

import { SuspenseLoader } from '@/components/App/Loader';
import { useRequest, useLoading, useApp } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { toastr, phoneRegExp } from '@/utils/helpers';
import styles from '@/styles/Components/Profile/Profile.module.scss';
import SideMenu from '@/Layout/FrontContainer/Components/SideMenu';
const ProfilePersonalSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  mobile_number: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid Phone')
    .min(9, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
});

function Index() {
  const { request, loading } = useRequest();
  const { state, dispatch } = useApp();
  const { ButtonLoader } = useLoading();
  // const getProfileUserDetail = useCallback(async () => {
  //   const req = (await request('getProfileUserDetail')) as REQUEST;
  //   if (req?.status) {
  //     dispatch({ user: req.data });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
    if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    const formData: FormData = new FormData();
    formData.append('profile_picture', file, file.name);
    const res = (await request('updateProfileUserDetail', formData)) as REQUEST;
    if (res?.status) {
      dispatch({ user: res.data });
    }
  };
  // useEffect(() => {
  //   getProfileUserDetail();
  // }, [getProfileUserDetail]);
  return (
    <>
      {state?.user ? (
        <div className="container py-lg-5 py-4">
          <div className="row">
            <SideMenu />
            <div className="col-xl-9 col-lg-8">
              <div className="card profileFormOuter overflowhidden border-0 p-4">
                <div className="card-header bg-transparent p-0 border-0 pb-4">
                  <div className="pageTitle">My Profile</div>
                </div>
                <div className={`cmnTable`}>
                  <div className={`${styles.companyProfile} d-flex align-items-center`}>
                    <span className={`${styles.companyImg} position-relative`}>
                      <span className={`${styles.imgOuter} w-100 h-100 rounded-circle overflow-hidden`}>
                        <img
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = '/assets/images/user-profile.png';
                          }}
                          src={state?.user?.image ? `${state?.user?.image}` : '/assets/images/user-profile.png'}
                          alt="company-profile"
                        />
                      </span>
                    <div className={styles.companyInformation}>
                      {loading?.getProfileUserDetail_LOADING ? (
                        <SuspenseLoader color={'#002e6e'} />
                      ) : (
                        <>
                          {state?.user?.firstname && (
                            <span className={styles.companyName}>
                              {state?.user?.firstname} {state?.user?.lastname}
                              <p className="text-muted text-capitalize">{state?.user?.type}</p>
                            </span>
                          )}
                        </>
                      )}
                      <input
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/bmp"
                        className={'form-control '}
                        id="chooseProfilePicture"
                        type="file"
                        onChange={onFileChange}
                        style={{ display: 'none' }}
                      />
                     
                      <label htmlFor="chooseProfilePicture" className="form-label position-absolute uploadImgBtn rounded-circle p-1 m-0 d-flex align-items-center justify-content-center bottom-0 end-0 mb-md-1 me-md-1">
                          <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.7328 2.55952C11.0919 2.20054 11.5789 1.99893 12.0867 1.99902C12.5944 1.99912 13.0814 2.20091 13.4403 2.56002C13.7993 2.91912 14.0009 3.40611 14.0008 3.91387C14.0007 4.42162 13.7989 4.90854 13.4398 5.26752L12.7068 6.00151L9.99883 3.29351L10.7328 2.56052V2.55952ZM9.29283 4.00051L3.33683 9.95451C3.15604 10.1354 3.01979 10.3559 2.93883 10.5985L2.02483 13.3415C1.99538 13.4296 1.99104 13.5241 2.0123 13.6145C2.03356 13.7049 2.07958 13.7876 2.14519 13.8533C2.21081 13.9191 2.29343 13.9652 2.3838 13.9866C2.47416 14.008 2.56871 14.0038 2.65683 13.9745L5.39983 13.0595C5.64283 12.9795 5.86283 12.8425 6.04383 12.6615L11.9998 6.70852L9.29183 3.99952L9.29283 4.00051Z" fill="white"/>
                          </svg>                                            
                      </label>
                    </div>
                    </span>
                  </div>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      email: state?.user?.email || '',
                      name: state?.user?.name || '',
                      mobile_number: state?.user?.mobile_number || '',
                      father_name: state?.user?.father_name || '',
                      dob: state?.user?.dob || '',
                      gender: state?.user?.gender || '',
                      address: state?.user?.address || '',
                      city: state?.user?.city || '',
                      state: state?.user?.state || '',
                      country: state?.user?.country || '',
                      zipcode: state?.user?.zipcode || '',
                      latitude: state?.user?.latitude || '',
                      longitude: state?.user?.longitude || '',
                    }}
                    validationSchema={ProfilePersonalSchema}
                    onSubmit={async values => {
                      const res = (await request('updateProfileUserDetail', values)) as REQUEST;
                      if (res?.status) {
                        dispatch({ user: res.data });
                      }
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Personal Information</Accordion.Header>
                            <Accordion.Body>
                              <Row>
                                <Col md={6} lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>{'Email *'}</Form.Label>
                                    <Form.Control
                                      placeholder="Email"
                                      name="email"
                                      type="email"
                                      onChange={handleChange}
                                      value={values.email}
                                      isInvalid={!!errors.email}
                                      readOnly
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6} lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>{'Name'}</Form.Label>
                                    <Form.Control
                                      placeholder="Name"
                                      name="name"
                                      type="text"
                                      onChange={handleChange}
                                      value={values.name}
                                      isInvalid={!!errors.name}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>{'Phone'}</Form.Label>
                                    <Form.Control
                                      placeholder="Phone"
                                      name="mobile_number"
                                      type="text"
                                      autoComplete="off"
                                      onChange={handleChange}
                                      value={values.mobile_number}
                                      isInvalid={!!errors.mobile_number}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Address Information</Accordion.Header>
                            <Accordion.Body>
                              <Row>
                                <Col md={6} lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>{'Email'}</Form.Label>
                                    <Form.Control
                                      placeholder="Email"
                                      name="email"
                                      type="email"
                                      onChange={handleChange}
                                      value={values.email}
                                      isInvalid={!!errors.email}
                                      readOnly
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6} lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>{'Name'}</Form.Label>
                                    <Form.Control
                                      placeholder="Name"
                                      name="name"
                                      type="text"
                                      onChange={handleChange}
                                      value={values.name}
                                      isInvalid={!!errors.name}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>{'Phone *'}</Form.Label>
                                    <Form.Control
                                      placeholder="Phone"
                                      name="mobile_number"
                                      type="text"
                                      autoComplete="off"
                                      onChange={handleChange}
                                      value={values.mobile_number}
                                      isInvalid={!!errors.mobile_number}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        <Row className='mx-0'>
                          <Col md={12} className="px-0 mt-3 text-end">
                            <Button type="submit" className="btn btnStyle2">
                              {loading?.PROFILE_UPDATE_USER_DETAIL_LOADING ? <ButtonLoader /> : 'Save'}
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
        <ButtonLoader />
      )}
    </>
  );
}

export default memo(Index);
