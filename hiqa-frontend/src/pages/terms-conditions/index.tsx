import TermsConditions from '@/Layout/StaticPage/TermsConditions';

function Index() {
  return (
    <>
      <TermsConditions />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Terms and Conditions',
};
export default Index;
