import React, { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { useApp } from '@/components/App';
import { COURSE } from '@/types/interfaces';
const TopHeader = dynamic(() => import('./TopHeader'), {
  loading: () => <div></div>,
  ssr: false,
});
const Header = () => {
  const [Btnshow, setBtnshow] = useState<boolean>(false);
  const [mobile, setmobile] = useState<boolean>(false);
  const [Events, setEvent] = useState<boolean>(false);
  const [News, setNews] = useState<boolean>(false);
  const [Services, setServices] = useState<boolean>(false);
  const [Blog, setblog] = useState<boolean>(false);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { state } = useApp();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header className="header-area header-three">
        <TopHeader personalData={state.setting_data}/>
        <div id="header-sticky" className={`menu-area${isScrolled ? 'menu-area sticky-menu' : ''}`}>
          <div className="container">
            <div className="second-menu">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-3">
                  <div className="logo">
                    <Link href="/">
                      <img src="assets/img/logo/11.png" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="main-menu text-right text-xl-right">
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <Link href="/">Home</Link>
                        </li>
                        <li>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li className="has-sub">
                          <Link href="/courses">Courses</Link>
                          <ul>
                            {state?.courseList &&
                              state?.courseList.map((course: COURSE, index: string) => (
                                <li key={index}>
                                  <Link href="#">{course.name}</Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        <li>
                          <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contact</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 text-right d-none d-lg-block text-right text-xl-right">
                  <div className="login">
                    <ul>
                      <li>
                        <Link
                          href="#"
                          className="menu-tigger"
                          onClick={() => {
                            setBtnshow(true);
                          }}
                        >
                          <i
                            className="fal fa-search"
                            onClick={() => {
                              setBtnshow(true);
                            }}
                          />
                        </Link>
                      </li>
                      <li>
                        <div className="second-header-btn">
                          <Link href="/contact" className="btn">
                            {' '}
                            registration open{' '}
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile-menu mean-container">
                    <div className="mean-bar">
                      <a
                        href="#nav"
                        onClick={() => setmobile(!mobile)}
                        className={`meanmenu-reveal ${mobile && 'meanclose'}`}
                        style={{ right: 0, left: 'auto', textAlign: 'center', textIndent: 0, fontSize: 18 }}
                      >
                        {mobile ? (
                          'X'
                        ) : (
                          <span>
                            <span>
                              <span></span>
                            </span>
                          </span>
                        )}
                      </a>
                      {mobile && (
                        <nav className="mean-nav">
                          <ul style={{ display: 'block' }}>
                            <li className="has-sub">
                              <a href="/">Home</a>
                              {Events && (
                                <ul style={{ display: 'block' }}>
                                  <li>
                                    <Link href="/">University</Link>
                                  </li>
                                  <li>
                                    <Link href="/home-two">Kindergarten</Link>
                                  </li>
                                  <li>
                                    <Link href="/home-three">High School</Link>
                                  </li>
                                </ul>
                              )}
                              <a
                                className={`mean-expand ${mobile && 'mean-clicked'}`}
                                onClick={() => {
                                  setEvent(!Events);
                                }}
                                href="#"
                                style={{ fontSize: 18 }}
                              >
                                {Events ? '-' : '+'}
                              </a>
                            </li>
                            <li>
                              <Link href="/about">About Us</Link>
                            </li>
                            <li className="has-sub">
                              <Link href="/courses">Courses</Link>
                              {News && (
                                <ul style={{ display: 'block' }}>
                                  <li>
                                    <Link href="/courses">Courses</Link>
                                  </li>
                                  <li>
                                    {' '}
                                    <Link href="/courses-2">Courses 02</Link>
                                  </li>
                                  <li>
                                    {' '}
                                    <Link href="/single-courses">Course Details</Link>
                                  </li>
                                  <li>
                                    {' '}
                                    <Link href="/single-courses-2">Course Details 02</Link>
                                  </li>
                                </ul>
                              )}

                              <a
                                className={`mean-expand ${mobile && 'mean-clicked'}`}
                                onClick={() => {
                                  setNews(!News);
                                }}
                                href="#"
                                style={{ fontSize: 18 }}
                              >
                                {News ? '-' : '+'}
                              </a>
                            </li>
                            <li className="has-sub">
                              <a href="#">Pages</a>
                              {Services && (
                                <ul style={{ display: 'block' }}>
                                  <li>
                                    <Link href="/event">Event</Link>
                                  </li>
                                  <li>
                                    <Link href="/single-event">Event Details</Link>
                                  </li>
                                  <li>
                                    <Link href="/projects">Gallery</Link>
                                  </li>
                                  <li>
                                    <Link href="/pricing">Pricing</Link>
                                  </li>
                                  <li>
                                    <Link href="/faq">Faq</Link>
                                  </li>
                                  <li>
                                    <Link href="/team">Teacher</Link>
                                  </li>
                                  <li>
                                    <Link href="/team-single">Teacher Details</Link>
                                  </li>
                                  <li>
                                    <Link href="/404-error">404 Error</Link>
                                  </li>
                                </ul>
                              )}
                              <a
                                className={`mean-expand ${mobile && 'mean-clicked'}`}
                                onClick={() => {
                                  setServices(!Services);
                                }}
                                href="#"
                                style={{ fontSize: 18 }}
                              >
                                {Services ? '-' : '+'}
                              </a>
                            </li>
                            <li className="has-sub">
                              <Link href="/blog">Blog</Link>
                              {Blog && (
                                <ul style={{ display: 'block' }}>
                                  <li>
                                    <Link href="/blog">Blog</Link>
                                  </li>
                                  <li>
                                    <Link href="/blog-details">Blog Details</Link>
                                  </li>
                                </ul>
                              )}
                              <a
                                className={`mean-expand ${mobile && 'mean-clicked'}`}
                                onClick={() => {
                                  setblog(!Blog);
                                }}
                                href="#"
                                style={{ fontSize: 18 }}
                              >
                                {Blog ? '-' : '+'}
                              </a>
                            </li>
                            <li className="mean-last">
                              <Link href="/contact">Contact</Link>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {Btnshow && (
        <>
          <div className={`offcanvas-menu ${'active'}`}>
            <span className="menu-close" onClick={() => setBtnshow(false)}>
              <i className="fas fa-times" onClick={() => setBtnshow(false)} />
            </span>
            <div id="cssmenu3" className="menu-one-page-menu-container">
              <ul className="menu">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/">Home</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/courses">Courses</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/pricing">Pricing </Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/team">Teacher</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/projects">Gallery</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div id="cssmenu2" className="menu-one-page-menu-container">
              <ul id="menu-one-page-menu-12" className="menu">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="#home">
                    <span>+8 12 3456897</span>
                  </Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="#howitwork">
                    <span>info@hiqa.com</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={`offcanvas-overly ${'active'}`}> </div>
        </>
      )}
    </>
  );
};

export default memo(Header);
