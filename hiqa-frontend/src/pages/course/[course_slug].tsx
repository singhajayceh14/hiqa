import CourseDetails from '@/Layout/Course/Components/CourseDetails';

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
