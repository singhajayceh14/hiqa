import NotFound from '@/Layout/NotFound';

function Index() {
  return (
    <>
      <NotFound />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Not Found',
};
export default Index;
