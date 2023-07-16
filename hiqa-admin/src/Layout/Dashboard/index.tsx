import dynamic from 'next/dynamic';
import React, { memo } from 'react';

import { SuspenseLoader } from '@/components/App/Loader';

const APIServiceStatus = dynamic(() => import('./Components/APIServiceStatus'));
const LastErrorActivity = dynamic(() => import('./Components/LastErrorActivity'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

const LastAppActivity = dynamic(() => import('./Components/LastAppActivity'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function index() {
  return (
    <div className="container-fluid">
      {/* <ActivityCount /> */}
      <div className="col-md-12 row">{/* <APIServiceStatus /> */}</div>
      <div className="col-md-8 row">{/* <LastErrorActivity /> */}</div>
      <div className="col-md-12 row mt-5">{/* <LastAppActivity /> */}</div>
    </div>
  );
}

export default memo(index);
