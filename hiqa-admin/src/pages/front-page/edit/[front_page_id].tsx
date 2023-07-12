// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const EditFrontPage = dynamic(() => import('@/Layout/FrontPage/Components/EditFrontPage'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <EditFrontPage />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Edit Front Page',
};
export default Index;
