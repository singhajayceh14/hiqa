import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import { useLoading, useRequest } from '@/components/App';
import { REQUEST, BLOG_DATA } from '@/types/interfaces';
import Pagination from '@/components/Default/Pagination/Pagination';

function Index() {
  const { loading, request } = useRequest();
  const [page, setPage] = useState(1);
  const { ButtonLoader } = useLoading();
  const [data, setData]: any = useState(null);

  const [lastPage, setLastPage] = useState(1);
  const [maxLength, setMaxLength] = useState(7);
  const initialize = useCallback(async () => {
    const req: any = (await request('getBlogPage', { page })) as REQUEST;
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
      <div>
        {!data ? (
          ButtonLoader({ color: '#101828' })
        ) : data.length === 0 ? (
          <span>There is no blogs found.</span>
        ) : (
          data?.map((e: BLOG_DATA, key: number) => (
            <div key={key} className="bsingle__post mb-50">
              <div className="bsingle__post-thumb">
                <img src={e.image} alt={e.title} />
              </div>
              <div className="bsingle__content">
                <h2>
                  <Link href={'blog/' + e.slug}>{e.title}</Link>
                </h2>
                <p>{e.short_description}</p>
                <div className="blog__btn">
                  <Link href={'blog/' + e.slug} className="btn">
                    Read More <i className="fal fa-long-arrow-right" />
                  </Link>
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
        <title>Blogs</title>
        <meta name="description" content={'Blogs' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <section className="inner-blog pt-50 pt-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div
                className="section-title center-align mb-50 text-center wow fadeInDown animated"
                data-animation="fadeInDown"
                data-delay=".4s"
              >
                <h5>
                  <i className="fas fa-blog"></i> Our Blog
                </h5>
                <h2>Blog Post</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              {children}
              <Pagination currentPage={page} lastPage={lastPage} maxLength={maxLength} setCurrentPage={setPage} />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <aside className="sidebar-widget">
                <section id="custom_html-5" className="widget_text widget widget_custom_html">
                  <h2 className="widget-title">Follow Us</h2>
                  <div className="textwidget custom-html-widget">
                    <div className="widget-social">
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fab fa-pinterest-p" />
                      </a>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fab fa-wordpress" />
                      </a>
                    </div>
                  </div>
                </section>

                <section id="recent-posts-4" className="widget widget_recent_entries">
                  <h2 className="widget-title">Recent Posts</h2>
                  <ul>
                    <li>
                      <Link href="#">User Experience Psychology And Performance Smshing</Link>
                      <span className="post-date">August 19, 2020</span>
                    </li>
                    <li>
                      <Link href="#">Monthly Web Development Up Cost Of JavaScript</Link>
                      <span className="post-date">August 19, 2020</span>
                    </li>
                    <li>
                      <Link href="#">There are many variation passages of like available.</Link>
                      <span className="post-date">August 19, 2020</span>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Index);
