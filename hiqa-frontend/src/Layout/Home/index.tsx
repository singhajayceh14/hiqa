import React, { memo, useCallback, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import FrontContainer from '@/Layout/FrontContainer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { useCommonReducer } from '@/components/App/reducer';

const SliderPage = dynamic(() => import('./Components/SliderPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const AboutPage = dynamic(() => import('./Components/AboutPage'), {
  loading: () => <div></div>,
  ssr: false,
});

const OurImpectPage = dynamic(() => import('./Components/OurImpectPage'), {
  loading: () => <div></div>,
  ssr: false,
});

const OurSiteVisitPage = dynamic(() => import('./Components/OurSiteVisitPage'), {
  loading: () => <div></div>,
  ssr: false,
});

const WhoParticipatePage = dynamic(() => import('./Components/WhoParticipatePage'), {
  loading: () => <div></div>,
  ssr: false,
});

const OpportunityPage = dynamic(() => import('./Components/OpportunityPage'), {
  loading: () => <div></div>,
  ssr: false,
});

const CoursePage = dynamic(() => import('./Components/CoursePage'), {
  loading: () => <div></div>,
  ssr: false,
});

const AdmissionPage = dynamic(() => import('./Components/AdmissionPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const BlogPage = dynamic(() => import('./Components/BlogPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const ScholarshipPage = dynamic(() => import('./Components/ScholarshipPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const EventPage = dynamic(() => import('./Components/EventPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const VideoPage = dynamic(() => import('./Components/VideoPage'), {
  loading: () => <div></div>,
  ssr: false,
});

const LogoSliderPage = dynamic(() => import('./Components/LogoSliderPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const FaqPage = dynamic(() => import('./Components/FaqPage'), {
  loading: () => <div></div>,
  ssr: false,
});
const SubscribePage = dynamic(() => import('./Components/SubscribePage'), {
  loading: () => <div></div>,
  ssr: false,
});
function Index() {
  const { request, loading } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();

  const getFrontPage = useCallback(async () => {
    const res = (await request('getFrontPage', {})) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        ...(resData as any),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console;
  useEffect(() => {
    getFrontPage();
  }, [getFrontPage]);

  console.log(globalState);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content={'Home' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        <SliderPage />
        <AboutPage />
        <OurImpectPage />
        <OurSiteVisitPage />
        <WhoParticipatePage />
        <OpportunityPage />
        <CoursePage />
        <EventPage />
        <VideoPage />
        <AdmissionPage />
        <LogoSliderPage />
        <BlogPage />
        <ScholarshipPage />
        <FaqPage />
        <SubscribePage />
      </FrontContainer>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
