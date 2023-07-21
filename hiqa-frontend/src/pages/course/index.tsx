import Course from '@/Layout/Course';

function Index() {
  return (
    <>
      <Course />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Course',
};
export default Index;
