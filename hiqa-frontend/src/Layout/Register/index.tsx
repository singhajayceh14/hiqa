import React, { memo, useCallback, useEffect } from 'react';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';
import { useCommonReducer } from '@/components/App/reducer';
import { SuspenseLoader } from '@/components/App/Loader';

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
      {loading?.getFrontPage_LOADING ? (
        <SuspenseLoader color={'#002e6e'} />
      ) : (
        <>
          <Head>
            <title>Home</title>
            <meta name="description" content={'Home' || 'HIQA'} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="favicon.ico" />
          </Head>
          <FrontContainer>
          
          </FrontContainer>
        </>
      )}
    </>
  );
}

// Index.auth = false;
export default memo(Index);
