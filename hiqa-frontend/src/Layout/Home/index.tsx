import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';

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
import CounterPage from './Components/CounterPage';

import { SuspenseLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';
import { REQUEST } from '@/types/interfaces';
import { useApp, useRequest } from '@/components/App';
import Modal from '@/components/Default/Modal';

function Index() {
  const { state } = useApp();
  const [loading, setLoading] = useState<boolean>(true);
  const { request } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  const coursePage = useMemo(
    () => <CoursePage course_data={globalState?.courses_list ?? []} />,
    [globalState?.courses_list],
  );

  const blogPage = useMemo(() => <BlogPage blog_data={globalState?.blogs ?? []} />, [globalState?.blogs]);
  const eventPage = useMemo(() => <EventPage event_data={globalState?.events ?? []} />, [globalState?.events]);
  const sliderPage = useMemo(() => <SliderPage banner_data={globalState?.banners ?? []} />, [globalState?.banners]);
  const counterPage = useMemo(() => <CounterPage counter_data={globalState?.counter} />, [globalState?.counter]);
  const faqsPage = useMemo(() => <FaqPage faqs_data={globalState?.faqs ?? []} />, [globalState?.faqs]);
  return (
    <>
      {loading ? (
        <SuspenseLoader color="#000" />
      ) : (
        <React.Fragment>
          {sliderPage}
          <AboutPage />
          {coursePage}
          {counterPage}
          {eventPage}
          <VideoPage />
          <AdmissionPage />
          <LogoSliderPage />
          {blogPage}
          <ScholarshipPage />
          {faqsPage}
          <SubscribePage />
        </React.Fragment>
      )}
    </>
  );
}

// Index.auth = false;
export default memo(Index);
