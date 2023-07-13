// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const Settings = dynamic(() => import('@/Layout/Settings'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <Settings />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Settings',
};
export default Index;
