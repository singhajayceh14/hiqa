// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const Profile = dynamic(() => import('@/Layout/Profile'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <Profile />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'My Profile',
};
export default Index;
