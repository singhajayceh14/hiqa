import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useApp } from '@/components/App';
import { COURSE } from "@/types/interfaces";


const Header = () => {
  const { state } = useApp();

  const router = useRouter();
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
              {state?.courseList && state?.courseList.map((course: COURSE, index:string)=>
                  <li key={index}>
                    <Link href="#">{course.name}</Link>
                  </li>
                )}
               
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
