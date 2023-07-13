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
import GoogleAutoComplete from '@/components/Default/Maps/Autocomplete';

const ProfilePersonalSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  title: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
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
  const getSettingsDetail = useCallback(async () => {
    const req = (await request('getSettingsDetail')) as REQUEST;
    if (req?.status) {
      dispatch({ settingsDetail: req.data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const onFileChange = async (event: any) => {
  //   const file = event.target.files[0];
  //   const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
  //   if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
  //   const formData: FormData = new FormData();
  //   formData.append('profile_picture', file, file.name);
  //   const res = (await request('updateProfileUserDetail', formData)) as REQUEST;
  //   if (res?.status) {
  //     dispatch({ profileDetail: res.data });
  //   }
  // };
  useEffect(() => {
    getSettingsDetail();
  }, [getSettingsDetail]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-12 ">
          <h2>Settings</h2>
        </div>
      </div>
      {/* <div className={`${styles.companyProfile} d-flex align-items-center`}>
        <span className={styles.companyImg}>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/assets/images/user-profile.png';
            }}
            src={
              state?.profileDetail?.image
                ? `${state?.profileDetail?.image}`
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
      </div> */}
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: state?.settingsDetail?.email || '',
          title: state?.settingsDetail?.title || '',
          sub_title: state?.settingsDetail?.sub_title || '',
          phone: state?.settingsDetail?.phone || '',
          facebook_url: state?.settingsDetail?.facebook_url || '',
          twitter_url: state?.settingsDetail?.twitter_url || '',
          skype_url: state?.settingsDetail?.skype_url || '',
          linkedin_url: state?.settingsDetail?.linkedin_url || '',
          instagram_url: state?.settingsDetail?.instagram_url || '',
          address: state?.settingsDetail?.address || '',
          latitude: state?.settingsDetail?.latitude || '',
          longitude: state?.settingsDetail?.longitude || '',
        }}
        validationSchema={ProfilePersonalSchema}
        onSubmit={async values => {
          const res = (await request('updateSettingsDetail', values)) as REQUEST;
          if (res?.status) {
            dispatch({ settingsDetail: res.data });
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors,setFieldValue, setErrors  }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
            <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Title *'}</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.title}
                    isInvalid={!!errors.title}
                  />
                  {errors.title ? (
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Sub Title *'}</Form.Label>
                  <Form.Control
                    placeholder="Sub Title"
                    name="sub_title"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.sub_title}
                    isInvalid={!!errors.sub_title}
                  />
                  {errors.sub_title ? (
                    <Form.Control.Feedback type="invalid">{errors.sub_title}</Form.Control.Feedback>
                  ) : null}
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
                    readOnly
                  />
                  {errors?.email ? <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> : null}
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

              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Facebook Url *'}</Form.Label>
                  <Form.Control
                    placeholder="Facebook Url"
                    name="facebook_url"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.facebook_url}
                    isInvalid={!!errors.facebook_url}
                  />
                  {errors.facebook_url ? (
                    <Form.Control.Feedback type="invalid">{errors.facebook_url}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Twitter Url *'}</Form.Label>
                  <Form.Control
                    placeholder="Twitter Url"
                    name="tw"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.twitter_url}
                    isInvalid={!!errors.twitter_url}
                  />
                  {errors.twitter_url ? (
                    <Form.Control.Feedback type="invalid">{errors.twitter_url}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Instagram Url *'}</Form.Label>
                  <Form.Control
                    placeholder="Instagram Url"
                    name="tw"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.instagram_url}
                    isInvalid={!!errors.instagram_url}
                  />
                  {errors.instagram_url ? (
                    <Form.Control.Feedback type="invalid">{errors.instagram_url}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Linkedin Url *'}</Form.Label>
                  <Form.Control
                    placeholder="Linkedin Url"
                    name="tw"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.linkedin_url}
                    isInvalid={!!errors.linkedin_url}
                  />
                  {errors.linkedin_url ? (
                    <Form.Control.Feedback type="invalid">{errors.linkedin_url}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{'Skype Url *'}</Form.Label>
                  <Form.Control
                    placeholder="Skype Url"
                    name="tw"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.skype_url}
                    isInvalid={!!errors.skype_url}
                  />
                  {errors.skype_url ? (
                    <Form.Control.Feedback type="invalid">{errors.skype_url}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <GoogleAutoComplete
                        name="address"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter Address *"
                        onChange={handleChange}
                        value={values.address}
                        isInvalid={!!errors.address}
                        onSelectOption={(address: {formattedAddress:string,lat:number,lng:number}) => {
                          setFieldValue('address', address.formattedAddress, true);
                          setFieldValue('latitude', address.lat, true);
                          setFieldValue('longitude', address.lng, true);
                        }}
                      />
                  {errors.skype_url ? (
                    <Form.Control.Feedback type="invalid">{errors.skype_url}</Form.Control.Feedback>
                  ) : null}
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
