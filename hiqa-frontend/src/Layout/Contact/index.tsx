import React, { memo, useMemo } from 'react';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import { useApp } from '@/components/App';

import TouchPage from './Components/TouchPage';
import MapPage from './Components/MapPage';
import ContactForm from './Components/ContactForm';

function Index() {
  const { state } = useApp();

  const touch = useMemo(() => <TouchPage personalData={state?.setting_data ?? {}} />, [state?.setting_data]);
  const map = useMemo(() => <MapPage personalData={state?.setting_data ?? {}} />, [state?.setting_data]);

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content={'Contact Us' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        {touch}
        {map}
        <ContactForm />
      </FrontContainer>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
