import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';

// Components

import { useApp, useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import Modal from '@/components/Default/Modal';
import { SuspenseLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';

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
  const { state } = useApp();
  const [loading, setLoading] = useState<boolean>(true);
  const { request } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();
  const [show, setShow] = useState<boolean>(false);

  const getFrontPage = useCallback(async () => {
    const payload: any = {};
    if (state.user) {
      payload['qualificationId'] = state?.user?.qualificationId;
    }
    const res = (await request('getFrontPage', payload)) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      setLoading(false);
      globalDispatch({
        ...(resData as any),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);
  useEffect(() => {
    getFrontPage();
    handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

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
  const sliderPage = useMemo(() => <SliderPage banner_data={globalState?.banners ?? []} />, [globalState?.banners]);


  return (
    <>
      {loading ? (
        <SuspenseLoader color="#000" />
      ) : (
        <React.Fragment>
          {sliderPage}
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
      <Modal id="Eligibility Page" size="lg" show={show} onClose={() => closeModal()}>
        <img src="assets/img/popup/2.png" alt="contact-bg-an-01" />
        {/* <EligibilityPage /> */}
      </Modal>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
