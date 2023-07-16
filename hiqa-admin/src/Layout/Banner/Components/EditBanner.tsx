import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import BannerForm from './BannerForm';

import { useContainerContext } from '@/Layout/Container/context';
import { REQUEST } from '@/types/interfaces';
import { useRequest } from '@/components/App';

function EditBanner() {
  const { query } = useRouter();
  const { state: globalState, dispatch: globalDispatch } = useContainerContext();
  const { request } = useRequest();

  const getBannerDetail = useCallback(async () => {
    const res = (await request('getBannerDetail', { id: query.banner_id })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        bannerDetail: {
          ...(resData as any),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.banner_id]);

  useEffect(() => {
    if (query?.banner_id) {
      getBannerDetail();
    }
  }, [getBannerDetail, query?.banner_id]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Edit Course</h2>
        </div>
      </div>
      {globalState?.bannerDetail && <BannerForm {...{ state: globalState, edit: true }} />}
    </div>
  );
}

export default EditBanner;
