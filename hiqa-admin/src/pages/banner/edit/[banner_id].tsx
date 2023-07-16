// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const EditBanner = dynamic(() => import('@/Layout/Banner/Components/EditBanner'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <EditBanner />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Edit Banner',
};
export default Index;
