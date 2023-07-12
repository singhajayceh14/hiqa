// Components
import dynamic from 'next/dynamic';
import { SuspenseLoader } from '@/components/App/Loader';

// Components
const AddFrontPage = dynamic(() => import('@/Layout/FrontPage/Components/AddFrontPage'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <AddFrontPage />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'Front Page Add',
};
export default Index;
