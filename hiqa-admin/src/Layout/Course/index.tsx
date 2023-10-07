import React, { useMemo, memo } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

import DefaultTable from '@/components/Default/Table';
import { useContainerContext } from '@/Layout/Container/context';
import { confirmDialog } from '@/utils/helpers';
import { REQUEST, COURSE } from '@/types/interfaces';
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
  const removeCourse = async (id: string) => {
    const confirm = await confirmDialog('Are you sure to remove Course');
    if (confirm) (await request('removeCourse', { id: id })) as REQUEST;
  };

  const getCourse = useMemo(
    () =>
      globalState?.getCourse && globalState?.getCourse?.result
        ? globalState?.getCourse?.result?.map((course: COURSE) => ({
            ...course,
            image: (
              <>
                <img src={course.image} alt="Course Image" style={{ width: '50px', height: '50px' }} />
              </>
            ),
            action: (
              <>
                <span className="pr-1">
                  <Link href={`/course/edit/${course.id}`}>
                    <i className="fa fa-pencil text-success"></i>
                  </Link>
                </span>
                <Button variant="link" onClick={() => removeCourse(course.id)}>
                  <i className="fa fa-trash text-danger"></i>
                </Button>
              </>
            ),
          }))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [globalState?.getCourse],
  );

  const isLoading = useMemo(() => loading?.removeCourse_LOADING, [loading]);
  return (
    <div className={`cmnTable`}>
      <div className="cmnTableHeader">
        <div className="tableHeading row">
          <div className="col-md-8 ">
            <h2>Course List</h2>
          </div>
          <div className="col-md-4 ">
            <div className="headingBtn">
              <div className="d-flex ">
                <Link href="/course/add">
                  <Button className="customBtn">Add Course</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DefaultTable
        api={{
          url: 'getCourse',
        }}
        search={true}
        columns={columns}
        data={getCourse}
        loading={Boolean(isLoading)}
        title="Course"
      />
    </div>
  );
}

export default memo(Index);
