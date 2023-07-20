import { memo } from 'react';
import Link from 'next/link';

import { BLOG_DATA } from '@/types/interfaces';

const BlogPage = ({ blog_data }: { blog_data: BLOG_DATA[] }) => {
  return (
    <section
      id="blog"
      className="blog-area p-relative fix pt-120 pb-90"
      style={{
        backgroundImage: 'url(assets/img/bg/blog_bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div
              className="section-title center-align mb-50 text-center wow fadeInDown animated"
              data-animation="fadeInDown"
              data-delay=".4s"
            >
              <h5>
                <i className="fal fa-graduation-cap" /> Our Blog
              </h5>
              <h2>Latest Blog &amp; News</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {blog_data.map((blog: BLOG_DATA, index: number) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className="single-post2 hover-zoomin mb-30 wow fadeInUp animated"
                data-animation="fadeInUp"
                data-delay=".4s"
              >
                <div className="blog-thumb2">
                  <Link href={'blog/' + blog.slug}>
                    <img src={blog.image} alt="img" />
                  </Link>
                  <div className="date-home">
                    <i className="fal fa-calendar-alt" /> 24th March 2023
                  </div>
                </div>
                <div className="blog-content2">
                  <h4>
                    <Link href={'blog/' + blog.slug}>{blog.title}</Link>
                  </h4>
                  <p>{blog.short_description}</p>
                  <div className="blog-btn">
                    <Link href={'blog/' + blog.slug}>
                      Read More <i className="fal fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default memo(BlogPage);
