import React, { useMemo, memo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import styles from '@/styles/Components/Address/Address.module.scss';
import { confirmDialog } from '@/utils/helpers';
import { REQUEST, ADDRESSES } from '@/types/interfaces';
import { useRequest } from '@/components/App';
const columns = [
  {
    dataField: '_id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'tag',
    text: 'Address Tag',
  },
  {
    dataField: 'address',
    text: 'Address',
  },
  {
    dataField: 'city',
    text: 'City',
  },
  {
    dataField: 'state',
    text: 'State',
  },
  {
    dataField: 'country',
    text: 'Country',
  },
  {
    dataField: 'location',
    text: 'Coordinates',
    search: false,
    sort: false,
  },
  {
    dataField: 'action',
    text: 'Action',
    search: false,
  },
];

function Index() {
  const { request, loading } = useRequest();
  const { state: globalState } = useContainerContext();
  const removeAddress = async (id: string) => {
    const confirm = await confirmDialog('Are you sure to remove Address');
    if (confirm) (await request('removeAddress', { _id: id })) as REQUEST;
  };

  const getAddresses = useMemo(
    () =>
      globalState?.getAddresses && globalState?.getAddresses?.result
        ? globalState?.getAddresses?.result?.map((address: ADDRESSES) => ({
            ...address,
            tag: address?.isDefault ? (
              <>
                <span>{address?.tag}</span>
                <span className={`${styles.addressDefault} tabBadge badge bg-primary`}>Default</span>
              </>
            ) : (
              address?.tag
            ),
            city: address?.fullAddress?.city,
            state: address?.fullAddress?.state,
            country: address?.fullAddress?.country,
            address: address?.fullAddress?.address,
            location: address?.fullAddress?.geoPoint?.coordinates?.toString(),
            action: (
              <>
                <span className="pr-1">
                  <Link href={`/address/edit/${address._id}`}>
                    <i className="fa fa-pencil text-success"></i>
                  </Link>
                </span>
                <Button variant="link" onClick={() => removeAddress(address._id)}>
                  <i className="fa fa-trash text-danger"></i>
                </Button>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getAddresses],
  );

  const isLoading = useMemo(() => loading?.removeAddress_LOADING, [loading]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Address</h2>
        </div>
        <div className="col-md-4 ">
          <div className="headingBtn">
            <div className="d-flex ">
              <Link href="/address/add">
                <Button className="customBtn">Add Address</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DefaultTable
        api={{
          url: 'getAddresses',
        }}
        search={true}
        columns={columns}
        data={getAddresses}
        loading={Boolean(isLoading)}
        title="Address"
      />
    </div>
  );
}

export default memo(Index);
