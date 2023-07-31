import Profile from '@/Layout/Profile';

function Index() {
  return (
    <>
      <Profile />
    </>
  );
}
Index.auth = true;
Index.meta = {
  title: 'Profile',
};
export default Index;
