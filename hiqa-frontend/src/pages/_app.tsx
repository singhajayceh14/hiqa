import React from 'react';
import '@/styles/globals.scss';
import '@/styles/App.scss';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import SSRProvider from 'react-bootstrap/SSRProvider';

import Container from '@/Layout/Container';
// import { Loading } from '@/components/App/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProvider } from '@/components/App';
import '../assets/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import '../assets/css/magnific-popup.css';
import '../assets/fontawesome/css/all.min.css';
import '../assets/css/dripicons.css';
import '../assets/css/slick.css';
import '../assets/css/meanmenu.css';
import '../assets/css/default.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
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
