import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import styles from '@/styles/Components/Address/Address.module.scss';
import { REQUEST, COURSE_PROPS } from '@/types/interfaces';
import { useRequest, useLoading } from '@/components/App';
import { toastr } from '@/utils/helpers';

const FormikSchema = Yup.object().shape({
  name: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  short_description: Yup.string().trim().min(2, 'Too Short!'),
  long_description: Yup.string().trim().min(2, 'Too Short!'),
  image: Yup.string(),
  duraion_course: Yup.string().required('Required'),
  total_seat: Yup.string().required('Required'),
  site_visits: Yup.string().required('Required'),
});

function CourseForm(props: COURSE_PROPS) {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state } = props;
  const [fileData, setfileData] = useState<{
    file: File | null;
    preView: string;
  }>({
    file: null,
    preView: state?.courseDetail?.image ?? '/assets/images/user-profile.png',
  });
  const [shortDescription, setshortDescription] = useState('');
  const [longDescription, setlongDescription] = useState('');
  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
    if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    setfileData({
      file: file,
      preView: URL.createObjectURL(file),
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: (state?.courseDetail?.name || '') as string,
        short_description: (state?.courseDetail?.short_description || '') as string,
        long_description: (state?.courseDetail?.long_description || '') as string,
        duraion_course: (state?.courseDetail?.duraion_course || '') as string,
        total_seat: (state?.courseDetail?.total_seat || '') as string,
        site_visits: (state?.courseDetail?.site_visits || '') as string,
      }}
      validationSchema={FormikSchema}
      onSubmit={async values => {
        const formData: FormData = new FormData();
        if (fileData.file) {
          formData.append('image', fileData.file);
        }
        formData.append('name', values.name);
        formData.append('short_description', shortDescription);
        formData.append('long_description', longDescription);
        formData.append('duraion_course', values.duraion_course);
        formData.append('total_seat', values.total_seat);
        formData.append('site_visits', values.site_visits);
        if (props?.edit) {
          formData.append('id', state?.courseDetail?.id || '');
        }
        if (request) {
          if (props?.edit) {
            const req = (await request('updateCourse', formData)) as REQUEST;
            if (req.status) {
              router.push('/course');
            }
          } else {
            const req = (await request('addCourse', formData)) as REQUEST;
            if (req.status) {
              router.push('/course');
            }
          }
        }
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit} id="addForm">
          <div className={styles.formField}>
            <Row>
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
                  <Form.Label>Duration course *</Form.Label>
                  <Form.Control
                    placeholder="Duration course"
                    name="duraion_course"
                    type="text"
                    onChange={handleChange}
                    value={values.duraion_course}
                    isInvalid={!!errors.duraion_course}
                  />
                  {errors.duraion_course ? (
                    <Form.Control.Feedback type="invalid">{errors.duraion_course}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Total seat *</Form.Label>
                  <Form.Control
                    placeholder="Total seat"
                    name="total_seat"
                    type="text"
                    onChange={handleChange}
                    value={values.total_seat}
                    isInvalid={!!errors.total_seat}
                  />
                  {errors.total_seat ? (
                    <Form.Control.Feedback type="invalid">{errors.total_seat}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Site visits *</Form.Label>
                  <Form.Control
                    placeholder="Site visits"
                    name="site_visits"
                    type="text"
                    onChange={handleChange}
                    value={values.site_visits}
                    isInvalid={!!errors.site_visits}
                  />
                  {errors.site_visits ? (
                    <Form.Control.Feedback type="invalid">{errors.site_visits}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Image *</Form.Label>
                  <span className={styles.companyImg}>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = '/assets/images/user-profile.png';
                      }}
                      src={fileData.preView}
                      alt="Course Image"
                    />
                  </span>
                  <div className={styles.companyInformation}>
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
                      Upload Image
                    </label>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Description *</Form.Label>
                  <JoditReact
                    config={{
                      readonly: false,
                      toolbar: true,
                      showXPathInStatusbar: false,
                      askBeforePasteHTML: false,
                      askBeforePasteFromWord: false,
                      askBeforePasteText: false,
                    }}
                    defaultValue={values.short_description}
                    onChange={content => {
                      setshortDescription(content);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long Description *</Form.Label>
                  <JoditReact
                    config={{
                      readonly: false,
                      toolbar: true,
                      showXPathInStatusbar: false,
                      askBeforePasteHTML: false,
                      askBeforePasteFromWord: false,
                      askBeforePasteText: false,
                    }}
                    defaultValue={values.long_description}
                    onChange={content => {
                      setlongDescription(content);
                    }}
                  />
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
                {loading?.addUser_LOADING ? ButtonLoader() : props.edit ? 'Update' : 'Save'}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default CourseForm;
