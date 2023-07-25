import React, { memo, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

import TopHeader from './TopHeader';

import { useApp } from '@/components/App';
import { COURSE } from '@/types/interfaces';

const Header = () => {
  const { state } = useApp();
  const [Btnshow, setBtnshow] = useState<boolean>(false);
  const [mobile, setmobile] = useState<boolean>(false);
  const [News, setNews] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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

  const topBar = useMemo(() => <TopHeader personalData={state?.setting_data ?? {}} />, [state?.setting_data]);

  return (
    <>
      <header className="header-area header-three">
        {topBar}
        <div id="header-sticky" className={`menu-area${isScrolled ? 'menu-area sticky-menu' : ''}`}>
          <div className="container">
            <div className="second-menu">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-3">
                  <div className="logo">
                    <Link href="/">
                      <img src="/assets/img/logo/11.png" alt="logo" />
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

                        <li className="has-sub">
                          <Link href="/course">Courses</Link>
                          <ul>
                            {state?.courseList &&
                              state?.courseList.map((course: COURSE, index: string) => (
                                <li key={index}>
                                  <Link href={'/course/' + course.slug}>{course.name}</Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        <li>
                          <Link href="/events">Events</Link>
                        </li>
                        <li>
                          <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link href="/about">About Us</Link>
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
                    <ul className="d-flex gap-xl-3 gap-2">
                      <li>
                        <div className="second-header-btn">
                          <Link className="btn signInBtns signUpBtn d-flex align-items-center gap-2" href="/register">
                            <div className="btnIcon">
                              <img className="w-100" src="/assets/img/logo/signUp.svg" alt="" />
                            </div>
                            <div className="txt d-none d-sm-block">Sign Up</div>
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="second-header-btn">
                          <Link className="btn signInBtns d-flex align-items-center gap-2" href="/login">
                            <div className="btnIcon">
                              <img className="w-100" src="/assets/img/logo/loginIcon.svg" alt="" />
                            </div>
                            <div className="txt d-none d-sm-block">Login</div>
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* <div className="dropdown userProfile text-end d-none">
                    <button
                      className="userImg border-0 p-0 shadow-none rounded-circle overflow-hidden"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        className="w-100 h-100"
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        alt=""
                      />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-0 overflow-hidden">
                      <li>
                        <a className="dropdown-item" href="#">
                          Menu 1
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Menu 2
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Menu 3
                        </a>
                      </li>
                    </ul>
                  </div> */}
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
                            <li>
                              <Link href="/">Home</Link>
                            </li>

                            <li className="has-sub">
                              <Link href="/course">Courses</Link>
                              {News && (
                                <ul style={{ display: 'block' }}>
                                  {state?.courseList &&
                                    state?.courseList.map((course: COURSE, index: string) => (
                                      <li key={index}>
                                        <Link href={'/course/' + course.slug}>{course.name}</Link>
                                      </li>
                                    ))}
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
                            <li>
                              <Link href="/events">Events</Link>
                            </li>
                            <li>
                              <Link href="/blog">Blog</Link>
                            </li>
                            <li>
                              <Link href="/about">About Us</Link>
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
                  <Link href="/course">Courses</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/events">Events</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <div className="second-header-btn">
                    <Link href="/contact" className="btn">
                      Login
                    </Link>
                  </div>
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
