import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useContainerContext } from '@/Layout/Container/context';
import { REQUEST } from '@/types/interfaces';
import { useRequest } from '@/components/App';

import FrontPageForm from './FrontPageForm';
function EditFrontPage() {
  const { query } = useRouter();
  const { state: globalState, dispatch: globalDispatch } = useContainerContext();
  const { request } = useRequest();

  const getFrontPageDetail = useCallback(async () => {
    const res = (await request('getFrontPageDetail', { id: query.front_page_id })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        frontPageDetail: {
          ...(resData as any),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.front_page_id]);

  useEffect(() => {
    if (query?.front_page_id) {
      getFrontPageDetail();
    }
  }, [getFrontPageDetail, query?.front_page_id]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Edit Front Page</h2>
        </div>
      </div>
      {globalState?.frontPageDetail &&  <FrontPageForm {...{ state: globalState, edit: true }} />}
     
    </div>
  );
}

export default EditFrontPage;
