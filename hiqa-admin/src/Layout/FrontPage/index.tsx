import React, { useMemo, memo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import styles from '@/styles/Components/Address/Address.module.scss';
import { confirmDialog } from '@/utils/helpers';
import { REQUEST, FRONTPAGE } from '@/types/interfaces';
import { useRequest } from '@/components/App';
const columns = [
  {
    dataField: '_id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'type',
    text: 'Type',
  },
  {
    dataField: 'title',
    text: 'Title',
  },
  {
    dataField: 'image',
    text: 'Image',
    search: false,
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
  const remove = async (id: string) => {
    const confirm = await confirmDialog('Are you sure to remove Front Page');
    if (confirm) (await request('remove', { id: id })) as REQUEST;
  };

  const getFrontPage = useMemo(
    () =>
      globalState?.getFrontPage && globalState?.getFrontPage?.result
        ? globalState?.getFrontPage?.result?.map((front: FRONTPAGE) => ({
            ...front,
            image:(<>
              <img src={front.image} alt="Front Page Image" style={{width:'50px',height:"50px"}}/>
            </>),
            action: (
              <>
                <span className="pr-1">
                  <Link href={`/front-page/edit/${front.id}`}>
                    <i className="fa fa-pencil text-success"></i>
                  </Link>
                </span>
                <Button variant="link" onClick={() => remove(front.id)}>
                  <i className="fa fa-trash text-danger"></i>
                </Button>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getFrontPage],
  );

  const isLoading = useMemo(() => loading?.remove_LOADING, [loading]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Front Page List</h2>
        </div>
        <div className="col-md-4 ">
          <div className="headingBtn">
            <div className="d-flex ">
              <Link href="/front-page/add">
                <Button className="customBtn">Add Front Page</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DefaultTable
        api={{
          url: 'getFrontPage',
        }}
        search={true}
        columns={columns}
        data={getFrontPage}
        loading={Boolean(isLoading)}
        title="Front Page"
      />
    </div>
  );
}

export default memo(Index);
