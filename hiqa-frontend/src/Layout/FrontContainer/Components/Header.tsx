import React, { memo, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

import { useApp } from '@/components/App';
import { COURSE } from '@/types/interfaces';
import styles from '@/styles/Components/Container/Header.module.scss';
import LoadStatusList from '@/components/Default/LoadStatusList';
import { logout } from '@/utils/helpers';

import TopHeader from './TopHeader';

const Header = () => {
  const { state, dispatch } = useApp();
  const [mobile, setMobile] = useState<boolean>(false);
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

  const logoutFunction = () => {
    dispatch({
      user: null,
    });
    logout();
  };
  return (
    <>
      <header className="header-area header-three">
        {topBar}
        <div id="header-sticky" className={`menu-area${isScrolled ? 'menu-area sticky-menu' : ''}`}>
          <div className="container">
            <div className="second-menu position-relative">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-3">
                  <div className="logo">
                    <Link href="/">
                      <img src="/assets/img/logo/11.png" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col d-none d-lg-block">
                  <div className="main-menu text-right text-xl-right">
                    <nav id="mobile-menu">
                      <ul className="d-flex justify-content-end">
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

                {state?.user ? (
                  <div className="col-auto d-none d-lg-block">
                    <LoadStatusList
                      key={'DropDown'}
                      label={
                        <span className={styles.userImg}>
                          <img src="/assets/images/user.png" alt="User" />
                        </span>
                      }
                      position={'absolute'}
                    >
                      <Link href="/" style={{ color: '#757575' }}>
                        Home
                      </Link>
                      <Link href="/profile" style={{ color: '#757575' }}>
                        My Profile
                      </Link>
                      <Button variant="link" style={{ fontSize: '14px', color: '#757575' }} onClick={logoutFunction}>
                        Logout
                      </Button>
                    </LoadStatusList>
                  </div>
                ) : (
                  <div className="col-xl-3 col-lg-3 text-right d-none d-lg-block text-right text-xl-right">
                    <div className="login">
                      <ul className="d-flex gap-xl-3 gap-2">
                        <li>
                          <div className="second-header-btn">
                            <Link className="btn signInBtns signUpBtn d-flex align-items-center gap-2" href="/register">
                              <div className="btnIcon">
                                <img className="w-100" src="/assets/img/logo/signUp.svg" alt="" />
                              </div>
                              <div className="txt d-none d-sm-block">Register</div>
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
                  </div>
                )}
                <div className="col-12">
                  <div className="mobile-menu mean-container d-flex d-lg-none align-items-center gap-3 top-0 bottom-0 end-0 position-absolute">
                    {state?.user ? (
                      <LoadStatusList
                        key={'DropDown'}
                        label={
                          <span className={styles.userImg}>
                            <img src="/assets/images/user.png" alt="User" />
                          </span>
                        }
                        position={'absolute'}
                      ></LoadStatusList>
                    ) : (
                      <ul className="d-flex gap-xl-3 gap-2 ">
                        <li>
                          <div className="second-header-btn">
                            <Link className="btn signInBtns signUpBtn d-flex align-items-center gap-2" href="/register">
                              <div className="btnIcon">
                                <img className="w-100" src="/assets/img/logo/signUp.svg" alt="" />
                              </div>
                              <div className="txt d-none d-md-block">Register</div>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="second-header-btn">
                            <Link className="btn signInBtns d-flex align-items-center gap-2" href="/login">
                              <div className="btnIcon">
                                <img className="w-100" src="/assets/img/logo/loginIcon.svg" alt="" />
                              </div>
                              <div className="txt d-none d-md-block">Login</div>
                            </Link>
                          </div>
                        </li>
                      </ul>
                    )}

                    <div className="mean-bar">
                      <a
                        href="#nav"
                        onClick={() => setMobile(!mobile)}
                        className={`meanmenu-reveal ${mobile && 'meanclose'}`}
                        style={{
                          right: 0,
                          left: 'auto',
                          textAlign: 'center',
                          textIndent: 0,
                          fontSize: 18,
                          position: 'unset',
                          margin: 0,
                        }}
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

                            {state?.user ? (
                              <>
                                <li className="mean-last">
                                  <Link href="/profile">Profile</Link>
                                </li>

                                <li className="mean-last">
                                  <Link href="/contact">Logout</Link>
                                </li>
                              </>
                            ) : null}
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
    </>
  );
};

export default memo(Header);
