// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const Banner = dynamic(() => import('@/Layout/Banner'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <Banner />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'My Banner',
};
export default Index;
