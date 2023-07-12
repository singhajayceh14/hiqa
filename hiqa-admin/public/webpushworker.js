self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('klg-2', data);
  self.registration.showNotification(
    data.title, //                                                                                   title of the notification
    {
      body: data.body || '', //the body of the push notification
      image: location.origin + '/logo.png',
      icon: location.origin + '/logo.png', // icon
    },
  );
});

function sendOutboxMessages() {
  console.log('Testing');
}
self.addEventListener('periodicsync', event => {
  if (event.tag === 'get-latest-news') {
    event.waitUntil(sendOutboxMessages());
  }
});
