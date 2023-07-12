import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles//Components/FrontContainer/Header.module.scss';

const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
        <Link href="/">
            <Image priority src="/assets/images/hiqa_logo.png" height={180} width={300} alt="" />
            </Link>
        </h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="active" href="index.html">
                Home
              </a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="courses.html">Courses</a>
            </li>
            <li>
              <a href="trainers.html">Trainers</a>
            </li>
            <li>
              <a href="events.html">Events</a>
            </li>
            <li>
              <a href="pricing.html">Pricing</a>
            </li>

            <li className="dropdown">
              <a href="#">
                <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li>
                  <a href="#">Drop Down 1</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Deep Drop Down 1</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 2</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 3</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 4</a>
                    </li>
                    <li>
                      <a href="#">Deep Drop Down 5</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Drop Down 2</a>
                </li>
                <li>
                  <a href="#">Drop Down 3</a>
                </li>
                <li>
                  <a href="#">Drop Down 4</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <a href="courses.html" className="get-started-btn">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default memo(Header);
