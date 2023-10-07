import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { REQUEST, USER_DATA, QUALIFICATION } from '@/types/interfaces';
import { useApp, useLoading, useRequest } from '@/components/App';
import { toastr } from '@/utils/helpers';
import Modal from '@/components/Default/Modal';

import RegisterFrom from './Components/RegisterFrom';
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
    if (values.paymentType === 'now') {
      await makePayment(values, formData);
    } else {
      const req = (await request('register', formData)) as REQUEST;
      if (req.status) {
        dispatch({ viewModal: true });
      }
    }
  };
  const makePayment = async (values: USER_DATA, formData: FormData) => {
    const registerChargerFees = values.amount + values.verifyAmount;
    const res = (await request('razorpayOrders', { amount: registerChargerFees, type: 'REGSITER' })) as REQUEST;
    if (!res) {
      toastr('Server error. Are you online?', 'error');
      return;
    }
    const result = res.data as any;

    const options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: process.env.COMPANY_NAME,
      currency: result.currency,
      amount: result.amount,
      order_id: result.id,
      description: 'Thankyou for your test donation',
      image: '/assets/img/logo/1112.png',
      handler: async function (response: any) {
        // Validate payment at server - using webhooks is a better idea.
        formData.append('receiptId', result.receipt);
        formData.append('razorpay_payment_id', response.razorpay_payment_id);
        formData.append('razorpay_order_id', response.razorpay_order_id);
        formData.append('razorpay_signature', response.razorpay_signature);

        if (request) {
          const req = (await request('register', formData)) as REQUEST;
          if (req.status) {
            handleOpen();
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
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleOpen = () => {
    const timer = setTimeout(() => {
      return router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  };
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
        <div className=" d-flex justify-content-center align-items-center">
          <div className="col-md-12">
            <div className="border border-3 border-success"></div>
            <div className="card  bg-white shadow p-5">
              <div className="mb-4 text-center" style={{ color: 'green', fontSize: '80px' }}>
                <i className="fa fa-check-circle"></i>
              </div>
              <div className="text-center">
                <h1>Thank You !</h1>
                <p>We've send the link to your inbox. Thank you for Registration </p>
                <div className="d-flex justify-content-center align-items-center">
                  <Link href={'/login'} className="btn btn-outline-success">
                    Back Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
