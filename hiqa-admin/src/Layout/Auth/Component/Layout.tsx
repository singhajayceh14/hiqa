import React, { useMemo, memo } from 'react';

import LeftSection from './LeftSection';
interface PROPS {
  children: JSX.Element;
}
const AuthLayout = (props: PROPS) => {
  const leftMenu = useMemo(() => <LeftSection />, []);

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="login_wrap">
        <div className="login-bg">
          <div className="login-logo">{leftMenu}</div>
          <div className="login-form">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthLayout);
