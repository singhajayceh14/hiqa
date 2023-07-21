import About from '@/Layout/About';

function Index() {
  return (
    <>
      <About />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'About Us',
};
export default Index;
