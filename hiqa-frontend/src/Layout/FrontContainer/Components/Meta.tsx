import Head from 'next/head';
import React, { memo } from 'react';
interface PROPS {
  title?: string;
  description?: string;
}
const Meta = (props: PROPS) => {
  const { title = 'HIQA', description = 'HIQA' } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default memo(Meta);
