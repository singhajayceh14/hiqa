import React, { memo } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import FrontContainer from '@/Layout/FrontContainer';

function CourseDetails() {
  return (
    <>
      <Head>
        <title>Course Details</title>
        <meta name="description" content={'Course Details' || 'HIQA'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <FrontContainer>dfasd</FrontContainer>
    </>
  );
}

export default memo(CourseDetails);
