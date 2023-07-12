// Components
import dynamic from 'next/dynamic';
import { SuspenseLoader } from '@/components/App/Loader';

// Components
const AddUser = dynamic(() => import('@/Layout/User/Components/AddUser'), {
  loading: () => <SuspenseLoader color={'#002e6e'} />,
  ssr: false,
});

function Index() {
  return (
    <>
      <AddUser />
    </>
  );
}

Index.auth = true;

Index.meta = {
  title: 'User Add',
};
export default Index;
