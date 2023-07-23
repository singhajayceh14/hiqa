import { memo, useState } from 'react';
import Link from 'next/link';

const VideoPage = () => {
  const [video, setVideo] = useState<boolean>(false);

  return (
    <>
      <section
        className="cta-area cta-bg pt-160 pb-160"
        style={{ backgroundImage: 'url(assets/img/bg/search_bg.png)' }}
      >
        <div className="container">
          <div className="row justify-content-center  align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <div
                className="section-title cta-title video-title wow fadeInLeft animated"
                data-animation="fadeInDown animated"
                data-delay=".2s"
              >
                <h2>
                  {' '}
                  We're <span>HIQA</span> &amp; We're Diffirent
                </h2>
                <p>
                  Our community is being called to reimagine the future. As the only university where a renowned design
                  school colleges,{' '}
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2"></div>
            <div className="col-lg-4">
              <div className="s-video-content">
                <Link href="#" className="popup-video mb-50" onClick={() => setVideo(true)}>
                  <img src="assets/img/bg/play-button2.png" alt="circle_right" onClick={() => setVideo(true)} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {video && (
        <>
          <div className="mfp-bg mfp-ready"></div>
          <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" style={{ overflow: 'hidden' }}>
            <div className="mfp-container mfp-s-ready mfp-iframe-holder">
              <div className="mfp-content">
                <div className="mfp-iframe-scaler">
                  <button title="Close (Esc)" type="button" className="mfp-close" onClick={() => setVideo(false)}>
                    ×
                  </button>
                  <iframe
                    className="mfp-iframe"
                    src="//www.youtube.com/embed/gyGsPlt06bo?autoplay=1"
                    frameBorder="0"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
              <div className="mfp-preloader">Loading...</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default memo(VideoPage);
