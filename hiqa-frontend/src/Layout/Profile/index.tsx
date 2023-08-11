import React, { memo, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import Accordion from 'react-bootstrap/Accordion';

import { useRequest, useLoading, useApp } from '@/components/App';
import { REQUEST, QUALIFICATION } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';
import GoogleAutoComplete from '@/components/Default/Maps/Autocomplete';
import CustomAutomplete from '@/components/Default/Autocomplete';
import styles from '@/styles/Components/Profile/Profile.module.scss';
import SideMenu from '@/Layout/FrontContainer/Components/SideMenu';
import { getQualificationOption } from '../Register/Components/RegisterFrom';

function Index() {
  const { request, loading } = useRequest();
  const { state, dispatch } = useApp();
  const { ButtonLoader } = useLoading();
  const [fileData, setfileData] = useState<{
    file: File | null;
    preView: string;
  }>({
    file: null,
    preView: state?.user?.image ? state?.user?.image : '/assets/images/user-profile.png',
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
  const onDocChange = async (event: any, name: string) => {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);
    const req = (await request('docUpload', formData)) as REQUEST;
    if (req.status) {
      const resData: any = req.data;
      return resData;
    }
    return '';
  };

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
                          src={fileData.preView}
                          alt="company-profile"
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
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      fullName: state?.user?.name || '',
                      fatherName: state?.user?.father_name || '',
                      email: state?.user?.email || '',
                      mobile_number: state?.user?.mobile_number || '',
                      gender: state?.user?.gender || '',
                      dob: state?.user?.dob || '',
                      address: state?.user?.address || '',
                      zipcode: state?.user?.zipcode || '',
                      latitude: state?.user?.latitude || '',
                      longitude: state?.user?.longitude || '',
                      country: state?.user?.country || '',
                      state: state?.user?.state || '',
                      city: state?.user?.city || '',
                      qualification: state?.user?.qualification.split(',') || [],
                      qualificationId: state?.user?.qualificationId.split(',') || [],
                      qualificationDoc: JSON.parse(state?.user?.qualificationDoc) || {},
                      category: state?.user?.category || '',
                    }}
                    onSubmit={async values => {
                      const res = (await request('updateUser', values)) as REQUEST;
                      if (res?.status) {
                        dispatch({ user: res.data });
                      }
                    }}
                  >
                    {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Personal Information</Accordion.Header>
                            <Accordion.Body>
                              <Row>
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
                                      value={values.mobile_number}
                                      isInvalid={!!errors.mobile_number}
                                    />
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
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Address Information</Accordion.Header>
                            <Accordion.Body>
                              <Row>
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
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>Qualification Information</Accordion.Header>
                            <Accordion.Body>
                              <Row>
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
                                            return state?.qualification?.find(
                                              (sm: QUALIFICATION) => sm.name === mp.name,
                                            )?.id;
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
                                                {getQualificationOption(q)}
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
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>

                        <Row className="mx-0">
                          <Col md={12} className="px-0 mt-3 text-end">
                            <Button type="submit" className="btn btnStyle2">
                              {loading?.updateUser_LOADING ? <ButtonLoader /> : 'Save'}
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
