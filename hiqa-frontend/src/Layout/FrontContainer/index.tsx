import React, { memo } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

type Props = {
  children: JSX.Element | string | JSX.Element[];
};
function Container({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default memo(Container);
