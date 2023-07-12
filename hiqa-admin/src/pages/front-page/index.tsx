// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const FrontPage = dynamic(() => import('@/Layout/FrontPage'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <FrontPage />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'My Front Page',
};
export default Index;
