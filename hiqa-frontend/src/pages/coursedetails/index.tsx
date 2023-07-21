import CourseDetails from '@/Layout/CourseDetails';

function Index() {
  return (
    <>
      <CourseDetails />
    </>
  );
}
Index.auth = false;
Index.meta = {
  title: 'Course Details',
};
export default Index;
