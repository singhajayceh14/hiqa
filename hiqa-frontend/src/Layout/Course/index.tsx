import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import { useLoading, useRequest } from '@/components/App';
import { REQUEST, COURSE_DATA } from '@/types/interfaces';

function Index() {
  const { loading, request } = useRequest();
  const [page, setPage] = useState(1);
  const { ButtonLoader } = useLoading();
  const [data, setData]: any = useState(null);
  const initialize = useCallback(async () => {
    const req: any = (await request('getCoursePage', { page })) as REQUEST;
    console.log(req?.data);
    if (req?.status) {
      if (page === 1) {
        setData(req?.data?.result);
      } else {
        setData((p: any) => [...p, ...(req?.data?.result ?? [])]);
      }
    }
  }, [page]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const children = useMemo(() => {
    return (
      <div>
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
                  <p>{course.short_description}</p>
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
  }, [data, ButtonLoader, loading]);
  return (
    <>
      <Head>
        <title>Course</title>
        <meta name="description" content={'Course' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        <section className="shop-area pt-120 pb-120 p-relative " data-animation="fadeInUp animated" data-delay=".2s">
          <div className="container">
            <div className="row align-items-center">{children}</div>
          </div>
        </section>
      </FrontContainer>
    </>
  );
}

export default memo(Index);
