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

const ProfilePersonalSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
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
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-12 ">
          <h2>User Profile</h2>
        </div>
      </div>
      <div className={`${styles.companyProfile} d-flex align-items-center`}>
        <span className={styles.companyImg}>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/assets/images/user-profile.png';
            }}
            src={state?.profileDetail?.image ? `${state?.profileDetail?.image}` : '/assets/images/user-profile.png'}
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
            className={'form-control'}
            id="chooseProfilePicture"
            type="file"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          <label
            className={`${styles.greenBtn} customBtn`}
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
          name: state?.profileDetail?.name || '',
          phone: state?.profileDetail?.mobile_number || '',
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
                  {errors?.email ? <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>

              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Name *'}</Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.name}
                    isInvalid={!!errors.name}
                  />
                  {errors.name ? <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> : null}
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
                  {errors.phone ? <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>
            </Row>
            <Col md={3}>
              <Button type="submit" className="customBtn w-100">
                {loading?.PROFILE_UPDATE_USER_DETAIL_LOADING ? <ButtonLoader /> : 'Save'}
              </Button>
            </Col>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default memo(Index);
