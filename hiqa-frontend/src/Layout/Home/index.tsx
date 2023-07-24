import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

// Components
import SliderPage from './Components/SliderPage';
import AboutPage from './Components/AboutPage';
import CoursePage from './Components/CoursePage';
import AdmissionPage from './Components/AdmissionPage';
import BlogPage from './Components/BlogPage';
import ScholarshipPage from './Components/ScholarshipPage';
import EventPage from './Components/EventPage';
import VideoPage from './Components/VideoPage';
import LogoSliderPage from './Components/LogoSliderPage';
import FaqPage from './Components/FaqPage';
import SubscribePage from './Components/SubscribePage';

import { SuspenseLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';
import FrontContainer from '@/Layout/FrontContainer';
import Modal from '@/components/Default/Modal';
import { REQUEST } from '@/types/interfaces';
import { useApp, useRequest } from '@/components/App';

function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useApp();
  const { request } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();
  const [show, setShow] = useState<boolean>(false);

  const getFrontPage = useCallback(async () => {
    const res = (await request('getFrontPage', {})) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      setLoading(false);
      globalDispatch({
        ...(resData as any),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getFrontPage();
    handleOpen();
  }, []);

  const closeModal = () => {
    setShow(false);
  };
  const handleOpen = () => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timer);
  };
  const coursePage = useMemo(
    () => <CoursePage course_data={globalState?.courses_list ?? []} />,
    [globalState?.courses_list],
  );

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
  const blogPage = useMemo(() => <BlogPage blog_data={globalState?.blogs ?? []} />, [globalState?.blogs]);
  const eventPage = useMemo(() => <EventPage event_data={globalState?.events ?? []} />, [globalState?.events]);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content={'Home' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        {loading ? (
          <SuspenseLoader color={'#002e6e'} />
        ) : (
          <React.Fragment>
            <SliderPage />
            <AboutPage />
            {coursePage}
            {eventPage}
            <VideoPage />
            <AdmissionPage />
            <LogoSliderPage />
            {blogPage}
            <ScholarshipPage />
            <FaqPage />
            <SubscribePage />
          </React.Fragment>
        )}
      </FrontContainer>
      <Modal id="viewload" title={'Eligibility Criteria'} size="lg" show={show} onClose={() => closeModal()}>
        {/* <img src="assets/img/popup/2.png" alt="contact-bg-an-01" /> */}
        <Formik
          
          enableReinitialize={true}
          initialValues={{
            qualification: '',
          }}
          onSubmit={async values => {
            console.log(values)
            const res = (await request('check-eligibility', values)) as REQUEST;
            if (res?.status) {
              return '';
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit} key="asd" className="contact-form mt-10 text-center">
              <div className="row">
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
      </Modal>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
