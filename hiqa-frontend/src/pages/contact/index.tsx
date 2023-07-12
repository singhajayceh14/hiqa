import Contact from '@/Layout/Contact';

function Index() {
  return (
    <>
      <Contact />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Contact Us',
};
export default Index;
