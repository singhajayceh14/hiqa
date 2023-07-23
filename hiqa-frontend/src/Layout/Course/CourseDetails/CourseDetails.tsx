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
                <h4>What You Will Learn</h4>
                <p>
                  Fusce eleifend donec sapien sed phase lusa pellentesque lacus.Vivamus lorem arcu semper duiac. Cras
                  ornare arcu avamus nda leo Etiam ind arcu. Morbi justo mauris tempus pharetra interdum at congue
                  semper purus. Lorem ipsum dolor sit.The world of search engine optimization is complex and
                  ever-changing, but you can easily understand the basics.
                </p>
                <p>
                  Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia
                  quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus
                  quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text
                  of the printing.
                </p>
                <ul className="pr-ul">
                  <li>
                    <div className="icon">
                      <i className="fal fa-check" />
                    </div>
                    <div className="text">Crawl accessibility so engines can read your website</div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fal fa-check" />
                    </div>
                    <div className="text">Share-worthy content that earns links, citations</div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fal fa-check" />
                    </div>
                    <div className="text">Keyword optimized to attract searchers &amp; engines</div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fal fa-check" />
                    </div>
                    <div className="text">Title, URL, &amp; description to draw high CTR</div>
                  </li>
                </ul>
                <h4>Study Options:</h4>
                <table className="table table-bordered mb-40">
                  <thead>
                    <tr>
                      <th>Qualification</th>
                      <th>Length</th>
                      <th>Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bsc (Hons)</td>
                      <td>3 years full time</td>
                      <td>CDX3</td>
                    </tr>
                    <tr>
                      <td>Bsc </td>
                      <td>4 years full time</td>
                      <td>CDX4</td>
                    </tr>
                  </tbody>
                </table>
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
                          Register <i className="fal fa-long-arrow-right" />
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
