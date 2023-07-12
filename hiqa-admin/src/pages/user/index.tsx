// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const User = dynamic(() => import('@/Layout/User'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <User />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'My User',
};
export default Index;
