import React, { memo } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

type Props = {
  children: JSX.Element | string | JSX.Element[];
};
function Container(props) {
  console.log({ props });

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default memo(Container);
