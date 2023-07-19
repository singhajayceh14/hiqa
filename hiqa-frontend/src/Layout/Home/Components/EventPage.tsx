import { memo } from 'react';
import Link from 'next/link';

const EventPage = () => {
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
            <div className="col-lg-4 col-md-6  wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="event-item mb-30 hover-zoomin">
                <div className="thumb">
                  <Link href="/single-event">
                    <img src="assets/img/bg/evn-img-1.jpg" alt="contact-bg-an-01" />
                  </Link>
                </div>
                <div className="event-content">
                  <div className="date">
                    <strong>7</strong> Aug, 2023
                  </div>
                  <h3>
                    <Link href="/single-event"> 33rd Annual Conference & Exhibition on Non-Destructive Evaluation (NDE 2023)</Link>
                  </h3>
                  <p>The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year</p>
                  <div className="time">
                    3:30 pm - 4:30 pm <i className="fal fa-long-arrow-right" /> <strong>Pune, India</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6  wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="event-item mb-30 hover-zoomin">
                <div className="thumb">
                  <Link href="/single-event">
                    <img src="assets/img/bg/evn-img-2.jpg" alt="contact-bg-an-01" />
                  </Link>
                </div>
                <div className="event-content">
                  <div className="date">
                    <strong>20</strong> Sep, 2023
                  </div>
                  <h3>
                    <Link href="/single-event">Virtual Conference & Exhibition, 09-11 Dec 2021 by Indian Society for NDT 2023</Link>
                  </h3>
                  <p>The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year</p>
                  
                  <div className="time">
                    3:30 pm - 4:30 pm <i className="fal fa-long-arrow-right" /> <strong>Delhi ,India</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6  wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="event-item mb-30 hover-zoomin">
                <div className="thumb">
                  <Link href="/single-event">
                    <img src="assets/img/bg/evn-img-3.jpg" alt="contact-bg-an-01" />
                  </Link>
                </div>
                <div className="event-content">
                  <div className="date">
                    <strong>22</strong> Dec, 2023
                  </div>
                  <h3>
                    <Link href="/single-event">Conference & Exhibition, 5-7 Dec 2019, Bengaluru, India (NDE-India 2023)</Link>
                  </h3>
                  <p>The Annual Conference of Indian Society for Non-Destructive Testing (ISNT), the Official Technical Society for NDT/NDE in India, NDE 2023, is organised every year</p>
                  <div className="time">
                    3:30 pm - 4:30 pm <i className="fal fa-long-arrow-right" /> <strong>Bengaluru, India</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(EventPage);
