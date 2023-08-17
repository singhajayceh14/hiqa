import React, { memo, useState, useMemo } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Steps, useSteps } from 'react-step-builder';

import { REQUEST, USER_DATA, QUALIFICATION } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';
import { useRequest } from '@/components/App';
import GoogleAutoComplete from '@/components/Default/Maps/Autocomplete';
import CustomAutomplete from '@/components/Default/Autocomplete';
import styles from '@/styles/Components/Profile/Profile.module.scss';
import { phoneRegExp } from '@/utils/helpers';

export const getQualificationOption = (q: string) => {
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

const initialValues: USER_DATA = {
  fullName: '',
  fatherName: '',
  email: '',
  mobile: '',
  gender: 'Male',
  paymentType: 'now',
  amount: 299.00,
  verifyAmount: 99.00,
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
  category: '',
};
const FirstRegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  fatherName: Yup.string().required('Father Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid Mobile Number!')
    .min(9, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Mobile is required'),
});
const SecondRegisterSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  zipcode: Yup.string().required('Pincode is required'),
});

const ThirdRegisterSchema = Yup.object().shape({
  qualification: Yup.array()
    .of(Yup.string())
    .min(1, 'Qualification is empty!')
    .max(50, 'Too Long!')
    .required('Required'),
});
interface PROPS {
  submit: (data: USER_DATA) => void;
  qualification: any;
}
function Index(props: PROPS) {
  const { request } = useRequest();

  const { prev, next, total, current } = useSteps();
  const [fileData, setfileData] = useState<{
    preView: string;
  }>({
    preView: '/assets/images/user-profile.png',
  });

  const validationSchema = useMemo(() => {
    switch (current) {
      case 1:
        return FirstRegisterSchema;
      case 2:
        return SecondRegisterSchema;
      case 3:
        return ThirdRegisterSchema;
    }
  }, [current]);

  const onFileChange = async (event: any, type: string) => {
    const file = event.target.files[0];
    if (type === 'image') {
      const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
      if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    }

    const formData: FormData = new FormData();
    formData.append('image', file);
    const req = (await request('docUpload', formData)) as REQUEST;
    if (req.status) {
      const resData: any = req.data;
      setfileData({
        preView: URL.createObjectURL(file),
      });
      return resData;
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
        validateOnMount={false}
        onSubmit={props.submit}
      >
        {({ handleSubmit, handleReset, handleChange, values, errors, touched, setFieldValue, validateForm }) => (
          <Form noValidate onSubmit={handleSubmit} onReset={handleReset} className="customForm">
            <div className="steps_wrapper">
              <Steps>
                <div className="step">
                  <Row>
                    <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                      <h4 className="text-capitalize">Personal Information</h4>
                    </div>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          placeholder="Your full name"
                          onChange={handleChange}
                          value={values.fullName}
                          isInvalid={!!errors.fullName}
                        />
                        {errors.fullName ? (
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
                        {errors.fatherName ? (
                          <Form.Control.Feedback type="invalid">{errors.fatherName}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          onChange={handleChange}
                          value={values.email}
                          isInvalid={!!errors.email}
                        />
                        {errors.email ? (
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mobile *</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobile"
                          placeholder="Your mobile no."
                          onChange={handleChange}
                          value={values.mobile}
                          isInvalid={!!errors.mobile}
                        />
                        {errors.mobile ? (
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
                          placeholder="Date"
                          onChange={handleChange}
                          value={values.dob}
                          isInvalid={!!errors.dob}
                        />
                        {errors.dob ? <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback> : null}
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
                        {errors.gender ? (
                          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={handleChange} name={`category`} value={values.category}>
                          <option>Select Category</option>
                          <option value={'gen'}>General</option>
                          <option value={'sc'}>SC</option>
                          <option value={'st'}>ST</option>
                          <option value={'obc'}>OBC</option>
                        </Form.Select>
                        {errors.category ? (
                          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
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
                              onChange={async event => {
                                const res = await onFileChange(event, 'image');
                                setFieldValue(`image`, res);
                              }}
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
                    <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
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
                            setFieldValue('address', address.formattedAddress, true);
                            setFieldValue('latitude', address.lat, true);
                            setFieldValue('longitude', address.lng, true);
                            setFieldValue('state', address.state, true);
                            setFieldValue('country', address.country, true);
                            setFieldValue('city', address.city, true);
                            setFieldValue('zipcode', address.postalCode, true);
                          }}
                        />
                        {errors.address ? (
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
                        {errors.city ? (
                          <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                        ) : null}
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
                        {errors.state ? (
                          <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                        ) : null}
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
                        {errors.country ? (
                          <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        ) : null}
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
                        {errors.zipcode ? (
                          <Form.Control.Feedback type="invalid">{errors.zipcode}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="step">
                  <Row>
                    <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
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
                              if (props?.qualification) {
                                return props?.qualification?.find((sm: QUALIFICATION) => sm.name === mp.name)?.id;
                              }
                            });
                            setFieldValue('qualificationId', [...quoteUsersIds]);
                          }}
                          onSelect={(e, val) => {
                            return val.name as string;
                          }}
                          isOptionsEmpty={false}
                          filter={true} //If not remote
                          //Provide only if we want to render a value again
                          values={values.qualification?.map((mp: string) => ({ name: mp })) || []}
                          data={props?.qualification || []}
                          filterfrom={val => val.name as string}
                          getvalue={val => val.name as string}
                          renderValue={val =>
                            props?.qualification?.find((vl: QUALIFICATION) => vl.name === val)?.name || ''
                          }
                        />
                        {errors.qualification ? (
                          <Form.Text className="text-danger">{errors.qualification}</Form.Text>
                        ) : null}
                      </Form.Group>
                      {values.qualification ? (
                        <>
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
                                      {getQualificationOption(q)}
                                    </Form.Select>
                                  </td>
                                  <td>
                                    <Form.Group controlId="formFile">
                                      <Form.Control
                                        type="file"
                                        onChange={async event => {
                                          const res = await onFileChange(event, 'doc');
                                          setFieldValue(`qualificationDoc[${q.toLowerCase()}].docs`, res);
                                        }}
                                      />
                                    </Form.Group>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <Col md={6}></Col>
                        </>
                      ) : null}
                    </Col>
                    <Col md={12}>
                      <Form.Label htmlFor="formPayment">Payment Type</Form.Label>
                      <Form.Group className="mb-3" controlId="formPayment" id="formPayment">
                        <Form.Check
                          inline
                          label="Pay Now"
                          name="paymentType"
                          type="radio"
                          id="inline-male"
                          value="now"
                          checked={values.paymentType === 'now'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          label="Pay Later"
                          name="paymentType"
                          type="radio"
                          id="inline-female"
                          value="later"
                          checked={values.paymentType === 'later'}
                          onChange={handleChange}
                        />
                        {errors.gender ? (
                          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Steps>
              <Row>
                <Col md={12}>
                  {current === total && values.paymentType === 'now' ? (
                    <div className="fees-view">
                      <div className="cont-fees">
                        <ul>
                          <li>
                            <span>Registration Charges :</span>
                            <span className="price-value">₹ {values.amount}</span>
                          </li>
                          <li>
                            <span>Verification Charges :</span>
                            <span className="price-value">₹ {values.verifyAmount}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="terms-wrap">
                        <h5>Disclaimer</h5>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                          been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type specimen book
                        </p>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                          been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type specimen book
                        </p>
                        <div className="term-inner-wrap">
                          <h5>View Schedule of Changes</h5>
                          <span className="d-flex">
                            <input type="checkbox" name="" id="" /> I accept all <a href="#">terms & condtions </a>{' '}
                            related to HIQA PVT LTD
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Col>
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
                      onClick={async () => {
                        const checkValidity = await validateForm();
                        if (Object.keys(checkValidity).length === 0) {
                          next();
                        }
                      }}
                    >
                      Next
                    </Button>

                    <Button type="submit" className={current === total ? 'btn btnStyle2' : 'btn btnStyle2 d-none'}>
                      {values.paymentType !== 'now'
                        ? 'Register'
                        : `Pay Now ( ₹ ${values.amount + values.verifyAmount} )`}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
