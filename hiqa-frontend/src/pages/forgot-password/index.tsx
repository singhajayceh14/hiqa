// Components
import ForgotPassword from '@/Layout/Auth/ForgotPassword';

function Index() {
  return (
    <>
      <ForgotPassword />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Forgot Password',
};
export default Index;
