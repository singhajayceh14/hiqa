import { useRouter } from 'next/router';
import React, { memo } from 'react';
import Link from 'next/link';

import { useApp } from '@/components/App';
import { logout } from '@/utils/helpers';

const SideMenu = () => {
  const { dispatch } = useApp();
  const { asPath } = useRouter();
  const logoutFunction = () => {
    dispatch({
      user: null,
    });
    logout();
  };

  return (
    <>
      <div className="col-xl-3 col-lg-4 d-none d-lg-block">
        <div
          className="sideBarMenus overflow-hidden border-0 customSideNav dnone d-lgblock d-flex flex-column flex-nowrap"
          id="customSideNav"
        >
          <div className="sidebarHeader p-2 px-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="title fw-bold">Menu</div>
          </div>
          <div className="sidebarBody flex-fill h-100">
            <ul className="p-0 m-0 list-unstyled">
              <li className="sideMenu border-bottom">
                <Link
                  href="/profile"
                  className={`${
                    asPath === '/profile' ? 'active' : ''
                  } sideMenuLink text-decoration-none d-flex align-items-center gap-2`}
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <i className="fas fa-user"></i>
                  </div>
                  My Profile
                </Link>
              </li>
              <li className="sideMenu border-bottom">
                <Link
                  href="/change-password"
                  className={`${
                    asPath === '/change-password' ? 'active' : ''
                  } sideMenuLink text-decoration-none d-flex align-items-center gap-2`}
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <i className="fas fa-key"></i>
                  </div>
                  Change Password
                </Link>
              </li>
              <li className="sideMenu border-bottom">
                <button
                  onClick={logoutFunction}
                  className="sideMenuLink border-0 w-100 bg-transparent shadow-none text-decoration-none d-flex align-items-center gap-2"
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SideMenu);
