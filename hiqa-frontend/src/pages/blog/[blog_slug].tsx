import BlogDetails from '@/Layout/Blogs/BlogDetails';

function Index() {
  return (
    <>
      <BlogDetails />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Blog Details',
};
export default Index;
