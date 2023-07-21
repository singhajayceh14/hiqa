import Events from '@/Layout/Events';

function Index() {
  return (
    <>
      <Events />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Events',
};
export default Index;
