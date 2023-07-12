// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const EditUser = dynamic(() => import('@/Layout/User/Components/EditUser'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <EditUser />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Edit User',
};
export default Index;
