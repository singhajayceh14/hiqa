// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const AddAddress = dynamic(() => import('@/Layout/Address/Components/AddAddress'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <AddAddress />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Add Address',
};
export default Index;
