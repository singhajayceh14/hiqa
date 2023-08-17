import React, { memo, useCallback, useEffect, useState } from 'react';

import { useApp, useLoading, useRequest } from '@/components/App';
import { useCommonReducer } from '@/components/App/reducer';
import { REQUEST, CART_ITEMS } from '@/types/interfaces';
import { Button } from 'react-bootstrap';

function Container() {
  const { state } = useApp();
  const { request, loading } = useRequest();
  const { state: globalState, dispatch: globalDispatch } = useCommonReducer();
  const { ButtonLoader } = useLoading();

  const getCart = useCallback(async () => {
    const res = (await request('getCart', {})) as REQUEST;
    if (res?.data) {
      const resData: any = res.data;
      globalDispatch({
        cart: resData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getCart();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const makePayment = async () => {
    const res = (await request('checkout')) as REQUEST;
    if (!res) {
      alert('Server error. Are you online?');
      return;
    }
    const result = res.data as any;

    const options = {
      key: 'rzp_test_o4ORT3Ja0YEpq8', // Enter the Key ID generated from the Dashboard
      name: 'HIQA Pvt Ltd',
      currency: result.currency,
      amount: result.amount,
      order_id: result.id,
      description: 'Thankyou for your test donation',
      image: '/assets/img/logo/1112.png',
      handler: async function (response: any) {
        // Validate payment at server - using webhooks is a better idea.
        console.log(response);
      },
      prefill: {
        name: state?.user?.name,
        email: state?.user?.email,
        contact: state?.user?.mobile,
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {globalState?.cart && (
        <div className="checkoutPageMain py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-sm-4 mb-3">
                <div className="mainHeading">Checkout</div>
              </div>
              <div className="col-lg-7">
                <div className="leftPart card profileFormOuter border-0 p-4 mb-0 h-100">
                  <div className="order-detail">
                    <div className="sectionHeading">Course Detail</div>
                    <div className="orderItems d-flex flex-column mt-3 gap-2">
                      {globalState.cart.cart_items.map((item: CART_ITEMS, index: number) => (
                        <div key={index} className="item p-2 rounded-3 border">
                          <div className="row g-3">
                            <div className="col-auto">
                              <div className="orderImgOuter rounded-3 overflow-hidden">
                                <img className="w-100 h-100" src={item?.course?.image} alt={item?.course?.name} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="orderTitle">{item?.course?.name}</div>
                              <div className="itemPera">
                                <p dangerouslySetInnerHTML={{ __html: item?.course?.short_description ?? '' }} />
                              </div>
                            </div>
                            <div className="col-auto">
                              <div className="price">₹ {item?.amount}</div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                        <div className="title">Sub Amount :</div>
                        <div className="value fw-medium">₹ {globalState?.cart?.totalAmount}</div>
                      </li>

                      <li className="d-flex align-items-center justify-content-between border-top pt-2">
                        <div className="title fw-bold">Total Amount :</div>
                        <div className="value fw-bold">₹ {globalState?.cart?.totalAmount}</div>
                      </li>
                    </ul>
                  </div>

                  <div className="second-header-btn mt-3">
                    <Button
                      type="button"
                      onClick={() => {
                        makePayment();
                      }}
                      className="btn signInBtns w-100 signUpBtn"
                    >
                      {loading?.checkout_LOADING ? ButtonLoader() : 'Pay Now'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Container);
