// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const Dashboard = dynamic(() => import('@/Layout/Dashboard'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <Dashboard />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Dashboard',
};
export default Index;
