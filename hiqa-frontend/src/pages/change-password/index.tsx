import ChangePassword from '@/Layout/Profile/ChangePassword';

function Index() {
  return (
    <>
      <ChangePassword />
    </>
  );
}
Index.auth = true;
Index.meta = {
  title: 'Change Password',
};
export default Index;
