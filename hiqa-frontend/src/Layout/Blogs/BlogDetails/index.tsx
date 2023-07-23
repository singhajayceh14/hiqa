import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import FrontContainer from '@/Layout/FrontContainer';
import { SuspenseLoader } from '@/components/App/Loader';
import { useCommonReducer } from '@/components/App/reducer';
import { useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';

import BlogDetailsPage from './BlogDetails';

function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const { query } = useRouter();
  const { request } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();
  const getBlogDetailsPage = useCallback(async () => {
    const res = (await request('getBlogDetailsPage', { slug: query.blog_slug })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      setLoading(false);
      globalDispatch({
        details: resData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.blog_slug]);

  useEffect(() => {
    getBlogDetailsPage();
  }, [getBlogDetailsPage, query.blog_slug]);

  const blogDetailsPage = useMemo(
    () => <BlogDetailsPage details={globalState?.details ?? {}} />,
    [globalState?.details],
  );
  return (
    <>
      <Head>
        <title>Blog Details</title>
        <meta name="description" content={'Blog Details' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>{loading ? <SuspenseLoader color={'#002e6e'} /> : <>{blogDetailsPage} </>}</FrontContainer>
    </>
  );
}

export default memo(Index);
