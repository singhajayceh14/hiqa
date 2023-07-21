import React, { memo } from 'react';
import Link from 'next/link';

import { BLOG_DATA } from '@/types/interfaces';
function BlogDetails({ details }: { details: BLOG_DATA }) {
  return (
    <>
       <section className="inner-blog b-details-p pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-details-wrap">
                  <div className="details__content pb-30">
                    <h2>With our vastly improved notifications system, users have more control.</h2>
                    <hr />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo amet set for your cool happiness for lyour loyal city.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deser unt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
                      natus error sit voluptatem accusant ium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                      voluptatem quia voluptas sit asperna tur aut odit aut fugit, sed quia consequuntur magni dolores
                      eos qui ratione voluptatem sequi nesciunt. Neque porro quisq.
                    </p>
                    <blockquote>
                      <footer>By Rosalina Pong</footer>
                      <h3>
                        Viral dreamcatcher keytar typewriter, aest hetic offal umami. Aesthetic polaroid pug pitchfork
                        post-ironic.
                      </h3>
                    </blockquote>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deser unt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
                      natus error sit voluptatem accusant.
                    </p>
                    <div className="details__content-img">
                      <img src="assets/img/blog/b_details01.jpg" alt="" />
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deser unt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
                      natus error sit voluptatem accusan tium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi archi tecto beatae vitae dicta sunt explicabo. Nemo enim
                      ipsam voluptatem quia voluptas sit asperna tur aut odit aut fugit, sed quia consequuntur magni
                      dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                      quia dolor sit amet, consectetur, adipisci velit, sed quia non num quam eius modi tempora incidunt
                      ut labore et dolore magnam aliquam quaerat voluptatem. Lorem ipsum dolor sit amet,consectetur
                      adipisicing elit, sed do eiusmod incididunt.
                    </p>
                    <figure>
                      <img src="assets/img/blog/b_details02.jpg" alt="" />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna ali qua. Ut enim ad minim veniam, quis nostrud exercitation ulla mco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupida tat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis
                        unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                        explicabo.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </figure>
                  </div>
                  <div className="posts_navigation pt-35 pb-35">
                    <div className="row align-items-center">
                      <div className="col-xl-4 col-md-5">
                        <div className="prev-link">
                          <span>Prev Post</span>
                          <h4>
                            <a href="#">Tips Minimalist</a>
                          </h4>
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-2 text-left text-md-center">
                        <Link href="/blog" className="blog-filter">
                          <img src="assets/img/icon/c_d01.png" alt="" />
                        </Link>
                      </div>
                      <div className="col-xl-4 col-md-5">
                        <div className="next-link text-left text-md-right">
                          <span>next Post</span>
                          <h4>
                            <a href="#">Less Is More</a>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="related__post mt-45 mb-85">
                    <div className="post-title">
                      <h4>Related Post</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="related-post-wrap mb-30">
                          <div className="post-thumb">
                            <img src="assets/img/blog/b_details03.jpg" alt="" />
                          </div>
                          <div className="rp__content">
                            <h3>
                              <a href="#">Auis nostrud exercita ullamco laboris nisi ut</a>
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed do eiusmod temp or
                              incididunt ut labore et dolore.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="related-post-wrap mb-30">
                          <div className="post-thumb">
                            <img src="assets/img/blog/b_details04.jpg" alt="" />
                          </div>
                          <div className="rp__content">
                            <h3>
                              <a href="#">Excepteur sint occaecat cupida tat non proident</a>
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed do eiusmod temp or
                              incididunt ut labore et dolore.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        <a href="#">User Experience Psychology And Performance Smshing</a>
                        <span className="post-date">August 19, 2020</span>
                      </li>
                      <li>
                        <a href="#">Monthly Web Development Up Cost Of JavaScript</a>
                        <span className="post-date">August 19, 2020</span>
                      </li>
                      <li>
                        <a href="#">There are many variation passages of like available.</a>
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

export default memo(BlogDetails);
