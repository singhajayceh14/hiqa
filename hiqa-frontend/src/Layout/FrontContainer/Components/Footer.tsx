import React, { memo } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/App';
 import { COURSE } from "@/types/interfaces";


const Footer = () => {
  const { state } = useApp();
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h5><b>HINDUSTAN</b> INSTITUTE OF QUALITY ASSURANCE </h5>
              <p>
                {state.setting_data.address}
                <br />
                <strong>Phone:</strong> {state?.setting_data?.phone}
                <br />
                <strong>Email:</strong> {state?.setting_data?.email}
                <br />
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i><Link href={'/'}>Home</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href={'/about'}>About us</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href={'/terms-condition'}>Terms & Condition</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href={'/privacy-policy'}>Privacy policy</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Course</h4>
              <ul>
                {state?.courseList && state?.courseList.map((course: COURSE, index:string)=>
                  <li key={index}>
                    <i className="bx bx-chevron-right"></i> <Link href="#">{course?.name}</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-4 footer-bottom">
        <div className="me-md-auto text-center text-md-start">
          <div className="copyright">
            &copy; Copyright
            <strong>
              <span> HIQA</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <Link href={state?.setting_data?.twitter_url} className="twitter">
            <i className="bx bxl-twitter"></i>
          </Link>
          <Link href={state?.setting_data?.facebook_url} className="facebook">
            <i className="bx bxl-facebook"></i>
          </Link>
          <Link href={state?.setting_data?.instagram_url} className="instagram">
            <i className="bx bxl-instagram"></i>
          </Link>
          <Link href={state?.setting_data?.skype_url} className="google-plus">
            <i className="bx bxl-skype"></i>
          </Link>
          <Link href={state?.setting_data?.linkedin_url} className="linkedin">
            <i className="bx bxl-linkedin"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
