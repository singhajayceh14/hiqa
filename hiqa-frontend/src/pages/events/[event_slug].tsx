import EventDetails from '@/Layout/Events/EventDetails';

function Index() {
  return (
    <>
      <EventDetails />
    </>
  );
}

Index.auth = false;

Index.meta = {
  title: 'Event Details',
};
export default Index;
