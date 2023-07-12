// Components
import dynamic from 'next/dynamic';
import { SuspenseLoader } from '@/components/App/Loader';

// Components
const AddCourse = dynamic(() => import('@/Layout/Course/Components/AddCourse'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <AddCourse />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Course Add',
};
export default Index;
