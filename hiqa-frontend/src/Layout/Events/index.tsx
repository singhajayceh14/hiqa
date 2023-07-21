import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import List from '@/components/Default/List';
import { useLoading, useRequest } from '@/components/App';
import { REQUEST, EVENT_DATA } from '@/types/interfaces';

function Index() {
  const { loading, request } = useRequest();
  const [page, setPage] = useState(1);
  const { ButtonLoader } = useLoading();
  const [data, setData]: any = useState(null);
  const initialize = useCallback(async () => {
    const req: any = (await request('getEventPage', { page })) as REQUEST;
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
  const onReachEnd = useCallback(() => {
    console.log('Loading...');
    if (!loading?.getEventPage_LOADING) {
      setPage(p => p + 1);
    }
  }, [loading]);

  const children = useMemo(() => {
    return (
      <div className="row">
        {!data ? (
          ButtonLoader({ color: '#101828' })
        ) : data.length === 0 ? (
          <span>There is no events found.</span>
        ) : (
          data?.map((event: EVENT_DATA, key: number) => (
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
        <section className="shop-area pt-120 p-relative " data-animation="fadeInUp animated" data-delay=".2s">
          <div className="container">
            <List onReachEnd={onReachEnd} style={{ height: 500 }}>
              {children}
            </List>
          </div>
        </section>
      </FrontContainer>
    </>
  );
}

export default memo(Index);
