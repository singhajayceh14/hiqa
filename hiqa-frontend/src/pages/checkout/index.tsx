import Checkout from '@/Layout/Checkout';

function Index() {
  return (
    <>
      <Checkout />
    </>
  );
}
Index.auth = true;
Index.meta = {
  title: 'Checkout',
};
export default Index;
