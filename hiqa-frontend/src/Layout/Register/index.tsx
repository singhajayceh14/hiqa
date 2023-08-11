import React, { memo, useState, useEffect } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Steps, useSteps } from 'react-step-builder';

import RegisterFrom from './Components/RegisterFrom';

import { REQUEST, USER_DATA, QUALIFICATION } from '@/types/interfaces';
import { toastr } from '@/utils/helpers';
import { useApp, useLoading, useRequest } from '@/components/App';
import Modal from '@/components/Default/Modal';
declare global {
  interface Window {
    Razorpay?: any;
  }
}
function Index() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { ButtonLoader } = useLoading();
  const { request } = useRequest();

  useEffect(() => {
    if (state?.user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.user]);
  const closeModal = (key: string) => {
    dispatch({ [key]: false });
  };

  const registerFormSubmit = async (values: USER_DATA) => {
    const formData: FormData = new FormData();

    const qualificationDoc = JSON.stringify(values.qualificationDoc);
    for (const key in values) {
      if (key === 'qualificationDoc') {
        formData.append('qualificationDoc', qualificationDoc);
      } else {
        formData.append(key, values[key]);
      }
    }
    await makePayment(values, formData);
  };
  const makePayment = async (values: USER_DATA, formData: FormData) => {
    const res = (await request('razorpayOrders')) as REQUEST;
    if (!res) {
      alert('Server error. Are you online?');
      return;
    }
    const result = res.data as any;

    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: 'HIQA Pvt Ltd',
      currency: result.currency,
      amount: result.amount,
      order_id: result.id,
      description: 'Thankyou for your test donation',
      image: '/assets/img/logo/1112.png',
      handler: async function (response: any) {
        // Validate payment at server - using webhooks is a better idea.
        formData.append('razorpay_payment_id', response.razorpay_payment_id);
        formData.append('razorpay_order_id', response.razorpay_order_id);
        formData.append('razorpay_signature', response.razorpay_signature);

        if (request) {
          const req = (await request('register', formData)) as REQUEST;
          if (req.status) {
            dispatch({ viewModal: true });
          }
        }
      },
      prefill: {
        name: values.fullName,
        email: values.email,
        contact: values.mobile,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return state?.user ? (
    <ButtonLoader color="#ff7350" />
  ) : (
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
              <div className="card p-lg-5 p-4 profileFormOuter" id="form1">
                <RegisterFrom
                  submit={registerFormSubmit}
                  qualification={state?.qualification as QUALIFICATION[]}
                ></RegisterFrom>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal id="thankYou" title={'Thank You'} size="lg" show={state.viewModal} onClose={() => closeModal('viewModal')}>
        <div className="container" style={{ width: 500 }}>
          <h5>Thank You</h5>
        </div>
      </Modal>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
