import React, { useMemo, memo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog } from '@/utils/helpers';
import { REQUEST, BANNER } from '@/types/interfaces';
import { useRequest } from '@/components/App';
const columns = [
  {
    dataField: '_id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'title',
    text: 'TItle',
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
  const removeBanner = async (id: string) => {
    const confirm = await confirmDialog('Are you sure to remove Banner');
    if (confirm) (await request('removeBanner', { id: id })) as REQUEST;
  };

  const getBanner = useMemo(
    () =>
      globalState?.getBanner && globalState?.getBanner?.result
        ? globalState?.getBanner?.result?.map((banner: BANNER) => ({
            ...banner,
            image: (
              <>
                <img src={banner?.image} alt="banner Image" style={{ width: '50px', height: '50px' }} />
              </>
            ),
            action: (
              <>
                <span className="pr-1">
                  <Link href={`/banner/edit/${banner.id}`}>
                    <i className="fa fa-pencil text-success"></i>
                  </Link>
                </span>
                <Button variant="link" onClick={() => removeBanner(banner.id)}>
                  <i className="fa fa-trash text-danger"></i>
                </Button>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getBanner],
  );

  const isLoading = useMemo(() => loading?.removeBanner_LOADING, [loading]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Banner List</h2>
        </div>
        <div className="col-md-4 ">
          <div className="headingBtn">
            <div className="d-flex ">
              <Link href="/banner/add">
                <Button className="customBtn">Add Banner</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DefaultTable
        api={{
          url: 'getBanner',
        }}
        search={true}
        columns={columns}
        data={getBanner}
        loading={Boolean(isLoading)}
        title="Banner"
      />
    </div>
  );
}

export default memo(Index);
