import { memo } from 'react';
import Link from 'next/link';

import { EVENT_DATA } from '@/types/interfaces';
import { formatDate } from '@/utils/helpers';

const EventPage = ({ event_data }: { event_data: EVENT_DATA[] }) => {
  return (
    <>
      <section className="event pb-90 p-relative fix">
        <div className="animations-06">
          <img src="assets/img/bg/an-img-06.png" alt="an-img-01" />
        </div>
        <div className="animations-07">
          <img src="assets/img/bg/an-img-07.png" alt="contact-bg-an-01" />
        </div>
        <div className="animations-08">
          <img src="assets/img/bg/an-img-08.png" alt="contact-bg-an-01" />
        </div>
        <div className="animations-09">
          <img src="assets/img/bg/an-img-09.png" alt="contact-bg-an-01" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-relative">
              <div
                className="section-title center-align mb-50 text-center wow fadeInDown animated"
                data-animation="fadeInDown"
                data-delay=".4s"
              >
                <h5>
                  <i className="fal fa-graduation-cap" /> Our Events
                </h5>
                <h2>Upcoming Events</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {event_data.map((event: EVENT_DATA, index: number) => (
              <div
                key={index}
                className="col-lg-4 col-md-6  wow fadeInUp animated"
                data-animation="fadeInUp"
                data-delay=".4s"
              >
                <div className="event-item mb-30 hover-zoomin">
                  <div className="thumb">
                    <Link href={'events/' + event.slug}>
                      <img src={event.image} alt="contact-bg-an-01" />
                    </Link>
                  </div>
                  <div className="event-content">
                    <div
                      className="date"
                      dangerouslySetInnerHTML={{ __html: formatDate(event?.event_date, 'custom') }}
                    ></div>
                    <h3>
                      <Link href={'events/' + event.slug}>{event.title}</Link>
                    </h3>
                    <p>{event.short_description} </p>
                    <div className="time">
                      {event.event_start_time} - {event.event_end_time} <i className="fal fa-long-arrow-right" />{' '}
                      <strong>{event.event_address}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(EventPage);
