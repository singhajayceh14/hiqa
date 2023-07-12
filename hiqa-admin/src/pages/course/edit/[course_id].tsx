// Components
import dynamic from 'next/dynamic';

import { SuspenseLoader } from '@/components/App/Loader';

// Components
const EditCourse = dynamic(() => import('@/Layout/Course/Components/EditCourse'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <EditCourse />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Edit Course',
};
export default Index;
