import CourseDetails from '@/Layout/Course/CourseDetails';

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
