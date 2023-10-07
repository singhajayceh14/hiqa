import React, { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useApp, useLoading } from '@/components/App';

import Header from './Components/Header';
import Footer from './Components/Footer';

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
  const { SimpleLoader } = useLoading();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);
  return initialLoding ? (
    <SimpleLoader />
  ) : (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default memo(Container);
