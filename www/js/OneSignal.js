<!--For OneSignal push notifications-->
<!--================================================================-->
// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.

document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("8388c0ef-1492-4892-9296-17091773564c")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);
<!--================================================================-->