import React, { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useApp, useLoading } from '@/components/App';

function Container() {
  const router = useRouter();
  const { SimpleLoader } = useLoading();
  const [initialLoading, setInitialLoading] = useState(true);
  const { getUserData } = useApp();
  const handelAuth = async () => {
    if (await getUserData()) {
      if (initialLoading) setInitialLoading(false);
      return;
    } else {
      const status = await getUserData();
      if (!status) router.push('/login');
    }
  };

  useEffect(() => {
    handelAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);
  return initialLoading ? (
    <SimpleLoader />
  ) : (
    <>
      <div className="checkoutPageMain py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-sm-4 mb-3">
              <div className="mainHeading">Checkout</div>
            </div>
            <div className="col-lg-7">
              <div className="leftPart card profileFormOuter border-0 p-4 mb-0 h-100">
                <div className="order-detail">
                  <div className="sectionHeading">Order Detail</div>
                  <div className="orderItems d-flex flex-column mt-3 gap-2">
                    <div className="item p-2 rounded-3 border">
                      <div className="row g-3">
                        <div className="col-auto">
                          <div className="orderImgOuter rounded-3 overflow-hidden">
                            <img
                              className="w-100 h-100"
                              src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="orderTitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, ullam.
                          </div>
                          <div className="itemPera">Lorem, ipsum dolor.</div>
                        </div>
                        <div className="col-auto">
                          <div className="price">
                            <s>₹999</s> ₹399
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 mt-3 mt-lg-0">
              <div className="paymentHistory card profileFormOuter border-0 p-4 mb-0 h-100">
                <div className="sectionHeading">Summary</div>
                <div className="priceOuter mt-2 mb-4">
                  <ul className="p-0 m-0 list-unstyled d-flex flex-column gap-2">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="title">Original Price :</div>
                      <div className="value fw-medium">₹999</div>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="title">Original Price :</div>
                      <div className="value fw-medium">-₹500</div>
                    </li>
                    <li className="d-flex align-items-center justify-content-between border-top pt-2">
                      <div className="title fw-bold">Total :</div>
                      <div className="value fw-bold">₹399</div>
                    </li>
                  </ul>
                </div>
                <div className="pera">
                  By completing your purchage you agree to these{' '}
                  <a href="javascript:;" className="termsCondition">
                    Terms & Conditions
                  </a>
                  .
                </div>
                <div className="second-header-btn mt-3">
                  <a className="btn signInBtns w-100 signUpBtn" href="javascript:;">
                    <div className="txt">Pay Now</div>
                  </a>
                </div>
                <div className="pera mt-3 text-center">30 Days Money Back Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Container);
