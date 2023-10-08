import Gallery from '@/Layout/Gallery';

function Index() {
  return (
    <>
      <Gallery />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Gallery',
};
export default Index;
