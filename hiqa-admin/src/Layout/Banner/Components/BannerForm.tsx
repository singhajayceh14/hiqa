import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import styles from '@/styles/Components/Address/Address.module.scss';
import { REQUEST, BANNER_PROPS } from '@/types/interfaces';
import { useRequest, useLoading } from '@/components/App';
import { toastr } from '@/utils/helpers';

const FormikSchema = Yup.object().shape({
  title: Yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  image: Yup.string(),
});

function BannerForm(props: BANNER_PROPS) {
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state } = props;
  const [fileData, setfileData] = useState<{
    file: File | null;
    preView: string;
  }>({
    file: null,
    preView: state?.bannerDetail?.image ?? '/assets/images/user-profile.png',
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

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: (state?.bannerDetail?.title || '') as string,
      }}
      validationSchema={FormikSchema}
      onSubmit={async values => {
        const formData: FormData = new FormData();
        if (fileData.file) {
          formData.append('image', fileData.file);
        }
        formData.append('title', values.title);
        if (props?.edit) {
          formData.append('id', state?.bannerDetail?.id || '');
        }
        if (request) {
          if (props?.edit) {
            const req = (await request('updateBanner', formData)) as REQUEST;
            if (req.status) {
              router.push('/banner');
            }
          } else {
            const req = (await request('addBanner', formData)) as REQUEST;
            if (req.status) {
              router.push('/banner');
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
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    placeholder="Title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={values.title}
                    isInvalid={!!errors.title}
                  />
                  {errors.title ? <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback> : null}
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
                      alt="Banner Image"
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
                {loading?.addBanner_LOADING ? ButtonLoader() : props.edit ? 'Update' : 'Save'}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default BannerForm;
