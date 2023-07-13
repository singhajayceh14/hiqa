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
    : ({ children }: { children: React.ReactElement<any> }) =>children;

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
