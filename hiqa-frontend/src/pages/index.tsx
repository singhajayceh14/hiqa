import Home from '@/Layout/Home';

function Index() {
  return (
    <>
      <Home />
    </>
  );
}
Index.auth = false;
Index.header = false;

Index.meta = {
  title: 'Home',
  description: 'Home',
};
export default Index;
