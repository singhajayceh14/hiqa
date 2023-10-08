import React, { memo, useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/components/App';
import { REQUEST, FAQS_DATA } from '@/types/interfaces';

function Index() {
  const [faqs, setFaqs] = useState([]);
  const { loading, request } = useRequest();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? 0 : index));
  };
  const initialize = useCallback(async () => {
    const req: any = (await request('getFAQ')) as REQUEST;
    if (req?.status) {
      setFaqs(req?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <section className="event event03 pt-150 pb-120 p-relative fix">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5  wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="s-video-wrap2" style={{ backgroundImage: 'url(assets/img/bg/video-img3.png)' }}></div>
            </div>
            <div className="col-lg-7 col-md-7  wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
              <div className="faq-wrap pl-30 wow fadeInUp animated" data-animation="fadeInUp" data-delay=".4s">
                <div className="accordion" id="accordionExample">
                  {faqs.map((item: FAQS_DATA, index) => (
                    <div className="card" key={index}>
                      <div className="card-header">
                        <h2 className="mb-0">
                          <button
                            className={`faq-btn${activeIndex === index ? '' : ' collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            onClick={() => handleToggle(index)}
                          >
                            {item.question}
                          </button>
                        </h2>
                      </div>
                      <div
                        id={`collapse${index}`}
                        className={`collapse${activeIndex === index ? ' show' : ''}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="card-body">{item.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Index);
