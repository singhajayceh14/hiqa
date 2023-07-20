import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import List from '@/components/Default/List';
import { useLoading, useRequest } from '@/components/App';
import { REQUEST } from '@/types/interfaces';

function Index() {
  const { loading, request } = useRequest();
  const [page, setPage] = useState(1);
  const { ButtonLoader } = useLoading();
  const [data, setData]: any = useState(null);
  const initialize = useCallback(async () => {
    const req: any = (await request('getBlogPage', { page })) as REQUEST;
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
    if (!loading?.getBlogPage_LOADING) {
      setPage(p => p + 1);
    }
  }, [loading]);

  const children = useMemo(() => {
    return (
      <div>
        {!data ? (
          ButtonLoader({ color: '#101828' })
        ) : data.length === 0 ? (
          <span>There is no groups found.</span>
        ) : (
          data?.map((e: any, key: number) => (
            <div key={key} className="bsingle__post mb-50">
              <div className="bsingle__post-thumb">
                <img src="assets/img/blog/inner_b1.jpg" alt="" />
              </div>
              <div className="bsingle__content">
                <h2>
                  <Link href="blog/blog-details">
                    Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor.
                  </Link>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.
                </p>
                <div className="blog__btn">
                  <Link href="blog/blog-details" className="btn">
                    Read More <i className="fal fa-long-arrow-right" />
                  </Link>
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
        <title>Blogs</title>
        <meta name="description" content={'Blogs' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        <section className="inner-blog pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <List onReachEnd={onReachEnd} style={{ paddingBottom: 10 }}>
                  {children}
                </List>
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
      </FrontContainer>
    </>
  );
}

export default memo(Index);
