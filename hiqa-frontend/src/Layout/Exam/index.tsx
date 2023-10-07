import React, { memo } from 'react';

function Index() {
  return (
    <>
      <section className="shop-area pt-50 pb-50  p-relative " data-animation="fadeInUp animated" data-delay=".2s">
        <div className="container">
          <div className="row d-flex justify-content-center wow fadeInDown animated">
            <div
              className="section-title center-align  text-center wow fadeInDown animated"
              data-animation="fadeInDown"
              data-delay=".4s"
            >
              <h4 className="text-capitalize">Registration Form</h4>
            </div>
            <div className="col-xxl-8 col-lg-8 ">
              <div className="card p-lg-5 p-4 profileFormOuter" id="form1"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
