import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import CourseDetailsPage from './CourseDetails';

import FrontContainer from '@/Layout/FrontContainer';
import { SuspenseLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';

function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const { query } = useRouter();
  const { request } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();
  const getCourseDetailsPage = useCallback(async () => {
    const res = (await request('getCourseDetailsPage', { slug: query.course_slug })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      setLoading(false);
      globalDispatch({
        details: resData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.course_slug]);

  useEffect(() => {
    getCourseDetailsPage();
  }, [getCourseDetailsPage, query.course_slug]);

  const courseDetailsPage = useMemo(
    () => <CourseDetailsPage details={globalState?.details ?? {}} />,
    [globalState?.details],
  );
  return (
    <>
      <Head>
        <title>Course Details</title>
        <meta name="description" content={'Course Details' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>{loading ? <SuspenseLoader color={'#002e6e'} /> : <>{courseDetailsPage} </>}</FrontContainer>
    </>
  );
}

export default memo(Index);
