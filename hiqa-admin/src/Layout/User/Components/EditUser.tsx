import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useContainerContext } from '@/Layout/Container/context';
import { REQUEST } from '@/types/interfaces';
import { useRequest } from '@/components/App';

import UserForm from './UserForm';
function EditUser() {
  const { query } = useRouter();
  const { state: globalState, dispatch: globalDispatch } = useContainerContext();
  const { request } = useRequest();

  const getUserByDetail = useCallback(async () => {
    const res = (await request('getUserDetail', { id: query.user_id })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        userDetail: {
          ...(resData as any),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.user_id]);

  useEffect(() => {
    if (query?.user_id) {
      getUserByDetail();
    }
  }, [getUserByDetail, query?.user_id]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Edit User</h2>
        </div>
      </div>
      <UserForm {...{ state: globalState, edit: true }} />
    </div>
  );
}

export default EditUser;
