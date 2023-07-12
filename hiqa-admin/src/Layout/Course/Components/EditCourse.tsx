import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useContainerContext } from '@/Layout/Container/context';
import { REQUEST } from '@/types/interfaces';
import { useRequest } from '@/components/App';

import CourseForm from './CourseForm';
function EditCourse() {
  const { query } = useRouter();
  const { state: globalState, dispatch: globalDispatch } = useContainerContext();
  const { request } = useRequest();

  const getCourseDetail = useCallback(async () => {
    const res = (await request('getCourseDetail', { id: query.course_id })) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        courseDetail: {
          ...(resData as any),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.course_id]);

  useEffect(() => {
    if (query?.course_id) {
      getCourseDetail();
    }
  }, [getCourseDetail, query?.course_id]);
  return (
    <div className={`cmnTable`}>
      <div className="tableHeading row">
        <div className="col-md-8 ">
          <h2>Edit Course</h2>
        </div>
      </div>
      {globalState?.courseDetail && <CourseForm {...{ state: globalState, edit: true }} />}
      
    </div>
  );
}

export default EditCourse;
