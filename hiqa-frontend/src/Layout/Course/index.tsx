import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import { useLoading, useRequest } from '@/components/App';
import { REQUEST, COURSE_DATA } from '@/types/interfaces';
import Pagination from '@/components/Default/Pagination/Pagination';

function Index() {
  const { loading, request } = useRequest();
  const [page, setPage] = useState(1);
  const { ButtonLoader } = useLoading();
  const [lastPage, setLastPage] = useState(1);
  const [maxLength, setMaxLength] = useState(7);
  const [data, setData]: any = useState(null);
  const initialize = useCallback(async () => {
    const req: any = (await request('getCoursePage', { page })) as REQUEST;
    if (req?.status) {
      if (page === 1) {
        setData(req?.data?.result);
      } else {
        setData((p: any) => [...p, ...(req?.data?.result ?? [])]);
      }
      setLastPage(req?.data?.page);
      setMaxLength(req?.data?.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const children = useMemo(() => {
    return (
      <div className="row align-items-center">
        {!data ? (
          ButtonLoader({ color: '#101828' })
        ) : data.length === 0 ? (
          <span>There is no course found.</span>
        ) : (
          data?.map((course: COURSE_DATA, key: number) => (
            <div className="col-lg-4 col-md-6" key={key}>
              <div className="courses-item mb-30 hover-zoomin">
                <div className="thumb fix">
                  <Link href={'course/' + course.slug}>
                    <img src={course.image} alt="course-img" />
                  </Link>
                </div>
                <div className="courses-content">
                  <h3>
                    <Link href={'course/' + course.slug}>{course.name}</Link>
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: course?.short_description ?? '' }} />
                  <Link href={'course/' + course.slug} className="readmore">
                    Read More <i className="fal fa-long-arrow-right" />
                  </Link>
                </div>
                <div className="icon">
                  <img src="assets/img/icon/cou-icon.png" alt="icon" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ButtonLoader, loading]);
  return (
    <>
      <Head>
        <title>Course</title>
        <meta name="description" content={'Course' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <section className="shop-area pt-50 pb-50  p-relative " data-animation="fadeInUp animated" data-delay=".2s">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div
                className="section-title center-align mb-50 text-center wow fadeInDown animated"
                data-animation="fadeInDown"
                data-delay=".4s"
              >
                <h5>
                  <i className="fal fa-graduation-cap" /> Our Courses
                </h5>
                <h2>Training Programs</h2>
              </div>
            </div>
          </div>
          {children}
          <Pagination currentPage={page} lastPage={lastPage} maxLength={maxLength} setCurrentPage={setPage} />
        </div>
      </section>
    </>
  );
}

export default memo(Index);
