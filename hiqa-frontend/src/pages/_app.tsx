import React, { useEffect } from 'react';
import '@/styles/globals.scss';
import '@/styles/App.scss';
import 'animate.css/animate.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import 'remixicon/fonts/remixicon.css';
import '@/styles/style.css';
import AOS from 'aos';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';

import Container from '@/Layout/Container';
// import { Loading } from '@/components/App/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProvider } from '@/components/App';

interface AppComponentProps extends AppProps {
  pageProps: any;
  Component: NextComponentType & {
    auth?: boolean;
    meta: {
      title: string;
    };
  };
}
export default function App({ Component, pageProps }: AppComponentProps) {
  useEffect(() => {
    AOS.init();
  }, []);
  const Layout = Component.auth
    ? ({ children }: { children: React.ReactElement<any> }) => <Container meta={Component.meta}>{children}</Container>
    : React.Fragment;
  return (
    <ErrorBoundary>
      <SSRProvider>
        <AppProvider>
          <Layout>
            <>
              {/* <Loading /> */}
              <Component {...pageProps} />
            </>
          </Layout>
        </AppProvider>
      </SSRProvider>
    </ErrorBoundary>
  );
}
