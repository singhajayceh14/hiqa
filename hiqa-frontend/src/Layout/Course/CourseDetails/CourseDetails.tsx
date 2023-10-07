import React, { memo } from 'react';
import Link from 'next/link';

import { COURSE_DATA } from '@/types/interfaces';
function CourseDetailsPage({ details }: { details: COURSE_DATA }) {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="lower-content">
          <div className="row">
            <div className="text-column col-lg-9 col-md-9 col-sm-12">
              <h2>{details.name}</h2>
              <div className="upper-box">
                <div className="single-item-carousel owl-carousel owl-theme">
                  <figure className="image">
                    <img src={details.image} alt={details.name} />
                  </figure>
                </div>
              </div>
              <div className="inner-column">
                <h3>Course Overview</h3>
                <p dangerouslySetInnerHTML={{ __html: details?.short_description ?? '' }} />
                <p dangerouslySetInnerHTML={{ __html: details?.long_description ?? '' }} />
              </div>
            </div>
            <div className="col-lg-3">
              <aside className="sidebar-widget info-column">
                <div className="inner-column3">
                  <h3>Course Features</h3>
                  <ul className="project-info clearfix">
                    <li>
                      <span className="icon fal fa-book" /> <strong>Lectures:</strong> <span>14</span>
                    </li>
                    <li>
                      <span className="icon fal fa-clock" /> <strong>Duration: </strong>{' '}
                      <span>{details.duraion_course}</span>
                    </li>

                    <li>
                      <span className="icon fal fa-user" /> <strong>Seats: </strong> <span>{details.total_seat}s</span>
                    </li>
                    <li>
                      <span className="icon fal fa-globe" /> <strong>Language: </strong> <span>English</span>
                    </li>
                    <li>
                      <span className="icon fal fa-clock" /> <strong>SiteVisit: </strong>{' '}
                      <span>{details.site_visits}</span>
                    </li>
                    <li>
                      <div className="slider-btn">
                        <Link href="/contact" className="btn ss-btn smoth-scroll">
                          Apply <i className="fal fa-long-arrow-right" />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CourseDetailsPage);
