import ComingSoon from '@/Layout/ComingSoon';

function Index() {
  return (
    <>
      <ComingSoon />
    </>
  );
}
Index.auth = false;
Index.header = true;

Index.meta = {
  title: 'Home',
  description: 'Home',
};
export default Index;
