import React, { memo } from 'react';
import Head from 'next/head';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
// import { LoadScript } from '@react-google-maps/api';
import dynamic from 'next/dynamic';

import { validateAuthentication } from '@/utils/helpers';

import { ContainerContextProvider } from './context';

const Header = dynamic(() => import('./Components/Header'), {
  loading: () => <div></div>,
  ssr: false,
});
const Footer = dynamic(() => import('./Components/Footer'), {
  loading: () => <div></div>,
  ssr: false,
});

const Sidebar = dynamic(() => import('./Components/Sidebar'), {
  loading: () => <div></div>,
  ssr: false,
});

type META = {
  title: string;
  description?: string;
};
type Props = {
  header?: boolean | false;
  children: JSX.Element | string | JSX.Element[];
  footer?: boolean | false;
  meta: META;
};
function Container({ children, header, meta }: Props) {
  const [hydrated, setHydrated] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta?.description || 'Catana'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      {validateAuthentication() && (
        <>
          {!header && <Header />}
          <Sidebar />
          {typeof window !== 'undefined' && window?.location?.pathname?.split('/')?.length > 2 && (
            <div className="goBackContainer">
              <Row>
                <Col md={3}>
                  <i role="button" onClick={() => router.back()} className="fa fa-arrow-left goBack"></i>
                </Col>
              </Row>
            </div>
          )}
          <div className="layoutContainer">
            <div className="layoutPage">{children}</div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

const IndexContainer = ({ children, header, meta }: Props) => {
  return (
    <ContainerContextProvider>
      <Container {...{ header, meta }}>{children}</Container>
    </ContainerContextProvider>
  );
};
export default memo(IndexContainer);
