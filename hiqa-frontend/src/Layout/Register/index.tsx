import React, { memo } from 'react';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';

function Index() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content={'Home' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>asd</FrontContainer>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
