import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useContainerContext } from '@/Layout/Container/context';
import { REQUEST } from '@/types/interfaces';
import { useRequest } from '@/components/App';

import AddressForm from './AddressForm';
function EditAddress() {
  const { query } = useRouter();
  const { state: globalState, dispatch: globalDispatch } = useContainerContext();
  const { request } = useRequest();

  const getAddressByDetail = useCallback(async () => {
    const res = (await request('getAddressDetail', { _id: query.address_id })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        addressDetail: {
          ...(resData as any),
          ...(resData.fullAddress as any),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.address_id]);

  useEffect(() => {
    if (query?.address_id) {
      getAddressByDetail();
    }
  }, [getAddressByDetail, query?.address_id]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Edit Address</h2>
        </div>
      </div>
      <AddressForm {...{ state: globalState, edit: true }} />
    </div>
  );
}

export default EditAddress;
