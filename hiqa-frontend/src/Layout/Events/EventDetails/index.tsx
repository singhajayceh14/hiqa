import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import FrontContainer from '@/Layout/FrontContainer';
import { SuspenseLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';

import EventDetailsPage from './EventDetails';

function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const { query } = useRouter();
  const { request } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();

  const getEventDetailsPage = useCallback(async () => {
    const res = (await request('getEventDetailsPage', { slug: query.event_slug })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      setLoading(false);
      globalDispatch({
        details: resData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.event_slug]);

  useEffect(() => {
    getEventDetailsPage();
  }, [getEventDetailsPage, query.event_slug]);

  const eventDetailsPage = useMemo(
    () => <EventDetailsPage details={globalState?.details ?? {}} />,
    [globalState?.details],
  );
  return (
    <>
      <Head>
        <title>Event Details</title>
        <meta name="description" content={'Event Details' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>{loading ? <SuspenseLoader color={'#002e6e'} /> : <>{eventDetailsPage} </>}</FrontContainer>
    </>
  );
}

export default memo(Index);
