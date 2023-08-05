import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from './Components/Header';
import Footer from './Components/Footer';

import { useApp, useLoading } from '@/components/App';

type Props = {
  children: JSX.Element | string | JSX.Element[];
  auth?: boolean;
  meta: {
    title: string;
    description: string;
  };
};
function Container({ children, auth }: Props) {
  const router = useRouter();
  const { ButtonLoader } = useLoading();
  const [initialLoding, setInitialLoding] = useState(true);
  const { getUserData } = useApp();
  const handelAuth = async () => {
    if (auth) {
      if (await getUserData()) {
        if (initialLoding) setInitialLoding(false);
        return;
      } else {
        const status = await getUserData();
        if (!status) router.push('/login');
      }
    } else {
      if (initialLoding) setInitialLoding(false);
      return;
    }
  };

  useEffect(() => {
    handelAuth();
  }, [router.pathname]);
  return initialLoding ? (
    <ButtonLoader color="#ff7350" />
  ) : (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default memo(Container);
