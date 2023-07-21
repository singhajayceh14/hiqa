import React, { memo } from 'react';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import TouchPage from './Components/TouchPage';
import MapPage from './Components/MapPage';
import ContactForm from './Components/ContactForm';

function Index() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content={'Contact Us' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>
        <TouchPage />
        <MapPage />
        <ContactForm />
      </FrontContainer>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
