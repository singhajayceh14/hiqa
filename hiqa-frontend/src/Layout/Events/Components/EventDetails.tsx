import React, { memo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';

function EventDetails() {
  return (
    <>
      <Head>
        <title>Event Details</title>
        <meta name="description" content={'Event Details' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>dfasd</FrontContainer>
    </>
  );
}

export default memo(EventDetails);
