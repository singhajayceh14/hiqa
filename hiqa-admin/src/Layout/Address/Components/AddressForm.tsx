import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import styles from '@/styles/Components/Address/Address.module.scss';
import GoogleAutoComplete from '@/components/Default/Maps/Autocomplete';
import { REQUEST, ADDRESS, ADDRESS_PROPS } from '@/types/interfaces';
import { useRequest, useLoading, useApp } from '@/components/App';

const FormikSchema = Yup.object().shape({
  address: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!'),
  streetAddress: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!').required('Required'),
  tag: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  city: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  state: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  country: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  zipcode: Yup.string().min(3, 'Too Short!').max(10, 'Too Long!').required('Required'),
  buildingNo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  isDefault: Yup.boolean().required('Required'),
});

function AddressForm(props: ADDRESS_PROPS) {
  const router = useRouter();
  const { validateZipCode } = useApp();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state } = props;
  console.log(state?.addressDetail?.isDefault);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        address: (state?.addressDetail?.address || '') as string,
        tag: (state?.addressDetail?.tag || '') as string,
        streetAddress: (state?.addressDetail?.streetAddress || '') as string,
        buildingNo: (state?.addressDetail?.buildingNo || '') as string,
        city: (state?.addressDetail?.city || '') as string,
        state: (state?.addressDetail?.state || '') as string,
        country: (state?.addressDetail?.country || '') as string,
        zipcode: (state?.addressDetail?.zipcode || '') as string,
        lat: (state?.addressDetail?.geoPoint?.coordinates[0] || 0) as number,
        lng: (state?.addressDetail?.geoPoint?.coordinates[1] || 0) as number,
        name: (state?.addressDetail?.name || '') as string,
        phone: (state?.addressDetail?.phone || '') as string,
        isDefault: (state?.addressDetail?.isDefault || false) as boolean,
      }}
      validationSchema={FormikSchema}
      onSubmit={async values => {
        const payload = {
          fullAddress: {
            city: values.city,
            state: values.state,
            country: values.country,
            buildingNo: values.buildingNo,
            address: values.address,
            streetAddress: values.streetAddress,
            zipcode: values.zipcode,
            name: values.name,
            phone: values.phone,
            geoPoint: {
              type: 'Point',
              coordinates: [values.lat, values.lng],
            },
          },
          isDefault: values.isDefault,
          tag: values.tag,
        };
        if (request) {
          if (props?.edit) {
            const req = (await request('updateAddress', {
              ...payload,
              _id: state?.addressDetail?._id,
            })) as REQUEST;
            if (req.status) {
              router.push('/address');
            }
          } else {
            const req = (await request('addAddress', payload)) as REQUEST;
            if (req.status) {
              router.push('/address');
            }
          }
        }
      }}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue, setErrors }) => (
        <Form noValidate onSubmit={handleSubmit} id="addAddressForm">
          <div className={styles.formField}>
            <Row>
              <Col md={6}>
                <GoogleAutoComplete
                  name="address"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Address *"
                  onChange={handleChange}
                  value={values.address}
                  isInvalid={!!errors.address}
                  onSelectOption={(address: ADDRESS) => {
                    setFieldValue('address', address.formattedAddress, true);
                    setFieldValue('streetAddress', address.formattedAddress, true);
                    setFieldValue('city', address.city, true);
                    setFieldValue('state', address.state, true);
                    setFieldValue('country', address.country, true);
                    setFieldValue('zipcode', address.postalCode, true);
                    setFieldValue('lat', address.lat, true);
                    setFieldValue('lng', address.lng, true);
                  }}
                />
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address Tag *</Form.Label>
                  <Form.Control
                    placeholder="Address Tag"
                    name="tag"
                    type="text"
                    onChange={handleChange}
                    value={values.tag}
                    isInvalid={!!errors.tag}
                  />
                  {errors.tag ? <Form.Control.Feedback type="invalid">{errors.tag}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Street Address *</Form.Label>
                  <Form.Control
                    placeholder="Street Address"
                    name="streetAddress"
                    type="text"
                    onChange={handleChange}
                    value={values.streetAddress}
                    isInvalid={!!errors.streetAddress}
                  />
                  {errors.streetAddress ? (
                    <Form.Control.Feedback type="invalid">{errors.streetAddress}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Building No </Form.Label>
                  <Form.Control
                    placeholder="Building No"
                    name="buildingNo"
                    type="text"
                    onChange={handleChange}
                    value={values.buildingNo}
                    isInvalid={!!errors.buildingNo}
                  />
                  {errors.buildingNo ? (
                    <Form.Control.Feedback type="invalid">{errors.buildingNo}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>City </Form.Label>
                  <Form.Control
                    readOnly
                    placeholder="City"
                    name="city"
                    type="text"
                    onChange={handleChange}
                    value={values.city}
                    isInvalid={!!errors.city}
                  />
                  {errors.city ? <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>State *</Form.Label>
                  <Form.Control
                    readOnly
                    placeholder="State"
                    name="state"
                    type="text"
                    onChange={handleChange}
                    value={values.state}
                    isInvalid={!!errors.state}
                  />
                  {errors.state ? <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback> : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Country *</Form.Label>
                  <Form.Control
                    readOnly
                    placeholder="Country"
                    name="country"
                    type="text"
                    onChange={handleChange}
                    value={values.country}
                    isInvalid={!!errors.country}
                  />
                  {errors.country ? (
                    <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Postal ZipCode *</Form.Label>
                  <Form.Control
                    placeholder="Postal ZipCode"
                    name="zipcode"
                    type="text"
                    onChange={handleChange}
                    onBlur={async event => {
                      const isValidZipCode = await validateZipCode(event.target.value, values.city);
                      if (!isValidZipCode) {
                        setErrors({ zipcode: 'Invalid Zip Code or Locality' });
                      }
                    }}
                    value={values.zipcode}
                    isInvalid={!!errors.zipcode}
                  />
                  {errors.zipcode ? (
                    <Form.Control.Feedback type="invalid">{errors.zipcode}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
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
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Default Set Pickup Address"
                    onChange={handleChange}
                    name="isDefault"
                    defaultChecked={values.isDefault}
                    isInvalid={!!errors.isDefault}
                  />
                  {errors.isDefault ? (
                    <Form.Control.Feedback type="invalid">{errors.isDefault}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
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
                {loading?.addAddress_LOADING ? ButtonLoader() : props.edit ? 'Update' : 'Save'}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default AddressForm;
