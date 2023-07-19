import React, { memo } from 'react';
// import { LoadScript } from '@react-google-maps/api';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Components/Header'), {
  loading: () => <div></div>,
  ssr: false,
});
const Footer = dynamic(() => import('./Components/Footer'), {
  loading: () => <div></div>,
  ssr: false,
});
const Breadcrumb = dynamic(() => import('./Components/Breadcrumb'), {
  loading: () => <div></div>,
  ssr: false,
});
type Props = {
  children: JSX.Element | string | JSX.Element[];
  breadcrumbStatus?: boolean;
  breadcrumbTitle?: string;
  breadcrumbSubtitle?: string;
  
};
function Container({ children, breadcrumbStatus, breadcrumbTitle, breadcrumbSubtitle}: Props) {
  return (
    <>
      <Header />
      {breadcrumbStatus ?? <Breadcrumb title={breadcrumbTitle} subtitle={breadcrumbSubtitle} />}
      {children}
      <Footer />
    </>
  );
}

export default memo(Container);
