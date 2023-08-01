// Components
import Login from '@/Layout/Auth/Login';

function Index() {
  return (
    <>
      <Login />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Login',
};
export default Index;
