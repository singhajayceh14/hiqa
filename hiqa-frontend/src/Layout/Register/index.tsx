import React, { memo } from 'react';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';
import 'formik-stepper/dist/style.css';
function Index() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content={'Register' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer></FrontContainer>
    </>
  );
}

// Index.auth = false;
export default memo(Index);
