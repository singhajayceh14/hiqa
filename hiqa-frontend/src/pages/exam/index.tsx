import Exam from '@/Layout/Exam';

function Index() {
  return (
    <>
      <Exam />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Exam',
};
export default Index;
