import Faqs from '@/Layout/StaticPage/Faqs';

function Index() {
  return (
    <>
      <Faqs />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'FAQS',
};
export default Index;
