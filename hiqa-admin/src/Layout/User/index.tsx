import React, { useMemo, memo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog } from '@/utils/helpers';
import { REQUEST, USER } from '@/types/interfaces';
import { useRequest } from '@/components/App';
const columns = [
  {
    dataField: '_id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'email',
    text: 'Email',
  },
  {
    dataField: 'mobile_number',
    text: 'Mobile Number',
  },
  {
    dataField: 'status',
    text: 'Status',
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
  const removeUser = async (id: string) => {
    const confirm = await confirmDialog('Are you sure to remove User');
    if (confirm) (await request('removeUser', { id: id })) as REQUEST;
  };

  const getUser = useMemo(
    () =>
      globalState?.getUser && globalState?.getUser?.result
        ? globalState?.getUser?.result?.map((user: USER) => ({
            ...user,
            action: (
              <>
                <span className="pr-1">
                  <Link href={`/user/edit/${user.id}`}>
                    <i className="fa fa-pencil text-success"></i>
                  </Link>
                </span>
                <Button variant="link" onClick={() => removeUser(user.id)}>
                  <i className="fa fa-trash text-danger"></i>
                </Button>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getUser],
  );

  const isLoading = useMemo(() => loading?.removeUser_LOADING, [loading]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>User List</h2>
        </div>
        <div className="col-md-4 ">
          <div className="headingBtn">
            <div className="d-flex ">
              <Link href="/user/add">
                <Button className="customBtn">Add User</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DefaultTable
        api={{
          url: 'getUser',
        }}
        search={true}
        columns={columns}
        data={getUser}
        loading={Boolean(isLoading)}
        title="User"
      />
    </div>
  );
}

export default memo(Index);
