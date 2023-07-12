// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const Address = dynamic(() => import('@/Layout/Address'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <Address />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'My Address',
};
export default Index;
