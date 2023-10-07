import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  return <>{loading ? <SuspenseLoader color={'#002e6e'} /> : <>{blogDetailsPage} </>}</>;
}

export default memo(Index);
