import React, { memo, useMemo } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import { useApp, useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';

function EligibilityPage() {
  const { state } = useApp();
  const { request } = useRequest();

  const getQualification = useMemo(
    () =>
      state.qualification &&
      state?.qualification.map((qa: { id: number; slug: string; name: string }) => (
        <>
          <option value={qa.slug}>{qa.name}</option>
        </>
      )),

    [state.qualification],
  );
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          qualification: '',
        }}
        onSubmit={async values => {
          console.log(values);
          const res = (await request('check-eligibility', values)) as REQUEST;
          if (res?.status) {
            return '';
          }
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit} className="contact-form mt-10 text-center">
            <div key={234234234234} className="row">
              <div className="col-md-8">
                <div className="contact-field p-relative c-name mb-10">
                  <Form.Select onChange={handleChange} aria-label="Default select example" name="qualification">
                    <option>Select Qualification</option>
                    {getQualification}
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-4">
                <Button type="submit" className="btn ss-btn" data-animation="fadeInRight" data-delay=".8s">
                  Check Eligibility <i className="fal fa-long-arrow-right" />
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default memo(EligibilityPage);
