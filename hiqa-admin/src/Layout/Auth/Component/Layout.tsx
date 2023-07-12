import React, { useMemo, memo } from 'react';

import styles from '@/styles/Components/Auth/Login.module.scss';

import LeftSection from './LeftSection';
interface PROPS {
  children: JSX.Element;
}
const AuthLayout = (props: PROPS) => {
  const leftMenu = useMemo(() => <LeftSection />, []);

  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className={styles.LoginPage}>
        <div className={styles.leftPannel}>{leftMenu}</div>
        <div className={styles.rightPannel}>
          <div className={'cmnFormSec ' + styles.login_right_container}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthLayout);
