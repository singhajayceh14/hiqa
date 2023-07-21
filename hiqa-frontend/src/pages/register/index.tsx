import Register from '@/Layout/Register';

function Index() {
  return (
    <>
      <Register />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Register',
};
export default Index;
