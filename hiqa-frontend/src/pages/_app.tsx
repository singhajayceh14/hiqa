/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import '@/styles/globals.scss';
import '@/styles/App.scss';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import { StepsProvider } from 'react-step-builder';

import FrontContainer from '@/Layout/FrontContainer';
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
import Meta from '@/Layout/FrontContainer/Components/Meta';

interface AppComponentProps extends AppProps {
  pageProps: any;
  Component: NextComponentType & {
    auth?: boolean;
    meta: {
      title: string;
      description: string;
    };
  };
}
export default function App({ Component, pageProps }: AppComponentProps) {
  const Layout = useMemo(
    () =>
      ({ children }: { children: React.ReactElement<any> }) =>
        <FrontContainer {...Component}>{children}</FrontContainer>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Component.auth],
  );

  const metaComponent = useMemo(
    () => <Meta title={Component.meta?.title} description={Component.meta?.description} />,
    [Component.meta],
  );
  // const Layout = Component.auth
  // ? ({ children }: { children: React.ReactElement<any> }) => <Container meta={Component.meta}>{children}</Container>
  // : React.Fragment;
  return (
    <ErrorBoundary>
      <StepsProvider>
        <AppProvider>
          <Layout>
            <>
              {metaComponent}
              <Component {...pageProps} />
            </>
          </Layout>
        </AppProvider>
      </StepsProvider>
    </ErrorBoundary>
  );
}
