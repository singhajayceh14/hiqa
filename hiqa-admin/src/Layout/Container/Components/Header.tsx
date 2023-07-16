import React, { memo } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

import LoadStatusList from '@/components/Default/LoadStatusList';
import styles from '@/styles/Components/Container/Header.module.scss';
import { logout } from '@/utils/helpers';
import { useContainerContext } from '@/Layout/Container/context';

function Header() {
  const { state } = useContainerContext();
  const toggalClass = () => {
    const bodyClass = document.querySelector<HTMLBodyElement>('body');
    if (bodyClass) {
      bodyClass.classList.toggle('toggleSidebar');
    }
  };
  return (
    <header className={`${styles.header} headerMenu`}>
      <div>
        <Link href="/dashboard" className={styles.logo}>
          <img style={{ width: '30px', height: '30px' }} src="/assets/images/logo.jpg" alt="logo" />
        </Link>
      </div>
      <div onClick={toggalClass}>
        <img src="/assets/icons/hamburger.png" alt=" " className={styles.hamburger} />
      </div>
      <div className={styles.hdrMenu}>
        <div className={styles.hdrRight}>
          <div className={`${styles.userProfile} ${styles.deskUserProfile} menuList`}>
            <LoadStatusList
              key={'DropDown'}
              label={
                <span className={styles.userImg}>
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = '/assets/images/user-profile.png';
                    }}
                    src={
                      state?.profileDetail?.image ? `${state?.profileDetail?.image}` : '/assets/images/user-profile.png'
                    }
                    alt="User profile"
                  />
                </span>
              }
              position={'absolute'}
            >
              <Link href="/dashboard" style={{ color: '#757575' }}>
                Dashboard
              </Link>
              <Link href="/profile" style={{ color: '#757575' }}>
                My Profile
              </Link>
              <Button variant="link" style={{ fontSize: '14px', color: '#757575' }} onClick={logout}>
                Logout
              </Button>
            </LoadStatusList>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
