import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import { useLoading, useRequest } from '@/components/App';
import { REQUEST, EVENT_DATA } from '@/types/interfaces';
import Pagination from '@/components/Default/Pagination/Pagination';

function Index() {
  const { loading, request } = useRequest();
  const [page, setPage] = useState(1);
  const { ButtonLoader } = useLoading();
  const [data, setData]: any = useState(null);

  const [lastPage, setLastPage] = useState(1);
  const [maxLength, setMaxLength] = useState(7);
  const initialize = useCallback(async () => {
    const req: any = (await request('getEventPage', { page })) as REQUEST;
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
      <div className="row">
        {!data ? (
          ButtonLoader({ color: '#101828' })
        ) : data.length === 0 ? (
          <span>There is no events found.</span>
        ) : (
          data?.map((event: EVENT_DATA) => (
            <div
              className="col-lg-4 col-md-6 wow fadeInUp animated"
              data-animation="fadeInUp"
              data-delay=".4s"
              key={event.id}
            >
              <div className="event-item mb-30 hover-zoomin">
                <div className="thumb">
                  <Link href={'events/' + event.slug}>
                    <img src={event.image} alt="contact-bg-an-01" />
                  </Link>
                </div>
                <div className="event-content">
                  <div className="date">{event.event_date}</div>
                  <h3>
                    <Link href={'events/' + event.slug}>{event.title}</Link>
                  </h3>
                  <p>{event.short_description}</p>
                  <div className="time">
                    {event.event_start_time} - {event.event_end_time} <i className="fal fa-long-arrow-right" />
                    <strong>{event.event_address}</strong>
                  </div>
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
        <title>Events</title>
        <meta name="description" content={'Events' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        <section className="shop-area pt-50 pb-50 p-relative " data-animation="fadeInUp animated" data-delay=".2s">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div
                  className="section-title center-align mb-50 text-center wow fadeInDown animated"
                  data-animation="fadeInDown"
                  data-delay=".4s"
                >
                  <h5>
                    <i className="fas fa-calendar-week" /> Our Events
                  </h5>
                  <h2>Upcoming Events</h2>
                </div>
              </div>
            </div>
            {children}
            <Pagination currentPage={page} lastPage={lastPage} maxLength={maxLength} setCurrentPage={setPage} />
          </div>
        </section>
      </FrontContainer>
    </>
  );
}

export default memo(Index);
