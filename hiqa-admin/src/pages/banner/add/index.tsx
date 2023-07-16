// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const AddBanner = dynamic(() => import('@/Layout/Banner/Components/AddBanner'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <AddBanner />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Banner Add',
};
export default Index;
