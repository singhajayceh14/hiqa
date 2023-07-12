import React, { memo } from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>HIQA</h3>
              <p>
                A108 Adam Street <br />
                New Delhi, India 535022
                <br />
                India <br />
                <br />
                <strong>Phone:</strong> +91 5589 55488 55
                <br />
                <strong>Email:</strong> info@hiqa.com
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
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href="#">Web Design</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href="#">Web Development</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href="#">Product Management</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href="#">Marketing</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i> <Link href="#">Graphic Design</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-4">
        <div className="me-md-auto text-center text-md-start">
          <div className="copyright">
            &copy; Copyright{' '}
            <strong>
              <span>HIQA</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <Link href="#" className="twitter">
            <i className="bx bxl-twitter"></i>
          </Link>
          <Link href="#" className="facebook">
            <i className="bx bxl-facebook"></i>
          </Link>
          <Link href="#" className="instagram">
            <i className="bx bxl-instagram"></i>
          </Link>
          <Link href="#" className="google-plus">
            <i className="bx bxl-skype"></i>
          </Link>
          <Link href="#" className="linkedin">
            <i className="bx bxl-linkedin"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
