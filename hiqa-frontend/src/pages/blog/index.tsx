import Blogs from '@/Layout/Blogs';

function Index() {
  return (
    <>
      <Blogs />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Blogs',
};
export default Index;
