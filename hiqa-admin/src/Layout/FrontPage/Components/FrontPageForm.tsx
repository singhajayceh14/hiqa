import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import styles from '@/styles/Components/Address/Address.module.scss';
import { REQUEST, FRONTPAGE_PROPS } from '@/types/interfaces';
import { useRequest, useLoading } from '@/components/App';
import { toastr, genrateRendomString} from '@/utils/helpers';
const FormikSchema = Yup.object().shape({
  type: Yup.string(),
  title: Yup.string().trim().min(2, 'Too Short!').required('Required'),
  description: Yup.string().trim().min(2, 'Too Short!'),
});



function FrontPageForm(props: FRONTPAGE_PROPS) {
 
  const router = useRouter();
  const { request, loading } = useRequest();
  const { ButtonLoader } = useLoading();
  const { state } = props;
  const [fileData, setfileData] = useState<{
    file:File | null,
    preView:string,
  }>({
    file:null,
    preView:state?.frontPageDetail.image ?? ''
  })
  const [description, setdescription] = useState<string>('')
  const onFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'];
    if (!fileTypes.includes(file.type)) return toastr('InvalidImage', 'warning');
    setfileData({
      file:file,
      preView:URL.createObjectURL(file)
    })
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        type: (state?.frontPageDetail?.type || '') as string,
        title: (state?.frontPageDetail?.title || '') as string,
        description: (state?.frontPageDetail?.description || '') as string,
      }}
      validationSchema={FormikSchema}
      onSubmit={async values => {
        const formData: FormData = new FormData();
        if(fileData.file){
          formData.append('image', fileData.file);
        }
        formData.append('type', values.type);
        formData.append('description', description);
        formData.append('title',  values.title); 
        if (props?.edit) {
          formData.append('id', state?.frontPageDetail?.id);   
        }
        console.log(formData)
        if (request) {
          if (props?.edit) {
            const req = (await request('updateFrontPage', formData)) as REQUEST;
            if (req.status) {
              router.push('/front-page');
            }
          } else {
            const req = (await request('addFrontPage', formData)) as REQUEST;
            if (req.status) {
              router.push('/front-page');
            }
          }
        }
      }}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue, setErrors }) => (
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
                  {errors.title ? (
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
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
                      alt="company-profile"
                      width={100}
                      height={100}
                      
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
              
              <Col md={12}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description *</Form.Label>
                    <JoditReact
                          config={{
                            readonly: false,
                            toolbar: true,
                            showXPathInStatusbar: false,
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            askBeforePasteText: false,
                          }}
                          defaultValue={ values.description }
                          onChange={(content) => {
                            setdescription(content);
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

export default FrontPageForm;
