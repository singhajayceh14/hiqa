import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import Head from 'next/head';

// Components
import FrontContainer from '@/Layout/FrontContainer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import Modal from '@/components/Default/Modal';
import { useCommonReducer } from '@/components/App/reducer';
import { SuspenseLoader } from '@/components/App/Loader';

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

function Index() {
  const [loading, setLoading] = useState<boolean>(true);

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
      <Modal id="viewload" title={''} width="" show={show} onClose={() => closeModal()}>
        <img src="assets/img/popup/2.png" alt="contact-bg-an-01" />
      </Modal>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
