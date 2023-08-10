// Components
import ResetPassword from '@/Layout/Auth/ResetPassword';

function Index() {
  return (
    <>
      <ResetPassword />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Reset Password',
};
export default Index;
