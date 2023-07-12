// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const Course = dynamic(() => import('@/Layout/Course'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <Course />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'My Course',
};
export default Index;
