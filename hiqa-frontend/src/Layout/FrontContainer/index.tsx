import React, { memo, useEffect } from 'react';
import router from 'next/router';

import Header from './Components/Header';
import Footer from './Components/Footer';

import { useApp } from '@/components/App';


type Props = {
  children: JSX.Element | string | JSX.Element[];
  auth?: boolean;
  meta: {
    title: string;
    description:string;
  };
};
function Container({ children, auth }: Props) {
  const { state } = useApp();

  useEffect(() => {
    console.log(state.user, auth)
    if (state?.user && auth === true) {
      router.push('/login');
    }
  }, [auth]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default memo(Container);
