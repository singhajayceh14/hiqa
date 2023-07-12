// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const EditAddress = dynamic(() => import('@/Layout/Address/Components/EditAddress'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <EditAddress />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Edit Address',
};
export default Index;
