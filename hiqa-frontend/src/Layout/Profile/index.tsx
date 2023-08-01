import React, { useCallback, useEffect, memo } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { SuspenseLoader } from '@/components/App/Loader';
import { useRequest, useLoading } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { useCommonReducer } from '@/components/App/reducer';
import { toastr, phoneRegExp } from '@/utils/helpers';
import styles from '@/styles/Components/Profile/Profile.module.scss';
import SideMenu from '@/Layout/FrontContainer/Components/SideMenu'
const ProfilePersonalSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  email_cc: Yup.string().email('Invalid email'),
  firstname: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastname: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid Phone')
    .min(9, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
});

function Index() {
  const { request, loading } = useRequest();
  const { state, dispatch } = useCommonReducer();
  const { ButtonLoader } = useLoading();
  const getProfileUserDetail = useCallback(async () => {
    const req = (await request('getProfileUserDetail')) as REQUEST;
    if (req?.status) {
      dispatch({ profileDetail: req.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
    if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    const formData: FormData = new FormData();
    formData.append('profile_picture', file, file.name);
    const res = (await request('updateProfileUserDetail', formData)) as REQUEST;
    if (res?.status) {
      dispatch({ profileDetail: res.data });
    }
  };
  useEffect(() => {
    getProfileUserDetail();
  }, [getProfileUserDetail]);
  return (
    <div className="container">
      <div className="row">
        <SideMenu />
        <div className="col-xl-9 col-lg-8">
          <div className="card profileFormOuter overflowhidden border-0 p-4">
            <div className="card-header bg-transparent p-0 border-0 pb-4">
              <div className="pageTitle">My Profile</div>
            </div>
            <div className={`cmnTable`}>
              <div className={`${styles.companyProfile} d-flex align-items-center`}>
                <span className={styles.companyImg}>
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = '/assets/images/user-profile.png';
                    }}
                    src={
                      state?.profileDetail?.profile_picture
                        ? `${process.env.REACT_APP_API_UPLOADS}${state?.profileDetail?.profile_picture}`
                        : '/assets/images/user-profile.png'
                    }
                    alt="company-profile"
                  />
                </span>
                <div className={styles.companyInformation}>
                  {loading?.getProfileUserDetail_LOADING ? (
                    <SuspenseLoader color={'#002e6e'} />
                  ) : (
                    <>
                      {state?.profileDetail?.firstname && (
                        <span className={styles.companyName}>
                          {state?.profileDetail?.firstname} {state?.profileDetail?.lastname}
                          <p className="text-muted text-capitalize">{state?.profileDetail?.type}</p>
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
                  <label
                    className={`${styles.greenBtn} signInBtns`}
                    style={{
                      cursor: 'pointer',
                    }}
                    htmlFor="chooseProfilePicture"
                  >
                    Change Photo
                  </label>
                </div>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email: state?.profileDetail?.email || '',
                  email_cc: state?.profileDetail?.email_cc || '',
                  firstname: state?.profileDetail?.firstname || '',
                  lastname: state?.profileDetail?.lastname || '',
                  phone: state?.profileDetail?.phone || '',
                }}
                validationSchema={ProfilePersonalSchema}
                onSubmit={async values => {
                  const res = (await request('updateProfileUserDetail', values)) as REQUEST;
                  if (res?.status) {
                    dispatch({ profileDetail: res.data });
                  }
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row>
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
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>{'Email CC'}</Form.Label>
                          <Form.Control
                            placeholder="Email CC"
                            name="email_cc"
                            type="email"
                            onChange={handleChange}
                            value={values.email_cc}
                            isInvalid={!!errors.email_cc}
                          />
                          <Form.Text className="text-muted">Provide email to CC for Notification</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>{'First name *'}</Form.Label>
                          <Form.Control
                            placeholder="Firstname"
                            name="firstname"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            value={values.firstname}
                            isInvalid={!!errors.firstname}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>{'Last name *'}</Form.Label>
                          <Form.Control
                            placeholder="Lastname"
                            name="lastname"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            value={values.lastname}
                            isInvalid={!!errors.lastname}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>{'Phone *'}</Form.Label>
                          <Form.Control
                            placeholder="Phone"
                            name="phone"
                            type="text"
                            autoComplete="off"
                            onChange={handleChange}
                            value={values.phone}
                            isInvalid={!!errors.phone}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Col md={3}>
                      <Button type="submit" className="signInBtns w-100">
                        {loading?.PROFILE_UPDATE_USER_DETAIL_LOADING ? <ButtonLoader /> : 'Save'}
                      </Button>
                    </Col>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Index);
