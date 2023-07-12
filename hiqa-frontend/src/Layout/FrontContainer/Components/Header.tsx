import React, { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  console.log(router.pathname)
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <Link href={'/'}>HIQA</Link>
        </h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <Link className={ router.pathname === '/' ? 'active' : ''} href={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link className={ router.pathname === '/about' ? 'active' : ''} href={'/about'}>About</Link>
            </li>
            <li className="dropdown">
              <a className={ router.pathname === '/courses' ? 'active' : ''} href="#">
                <span>Courses</span> <i className="bi bi-chevron-down"></i>
              </a>
              <ul>
                <li>
                  <a href="#">Drop Down 1</a>
                </li>
                {/* <li className="dropdown">
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
                </li> */}
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
              <Link className={ router.pathname === '/contact' ? 'active' : ''} href={'/contact'}>Contact</Link>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <Link href={'/register'} className="get-started-btn">
          Register
        </Link>
      </div>
    </header>
  );
};

export default memo(Header);
