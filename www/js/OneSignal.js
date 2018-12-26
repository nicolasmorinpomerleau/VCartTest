// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.
function onLoad() {
    
document.addEventListener("deviceready", function () {
//    $(document).ready(function(){

  // Enable to debug issues.
   window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

    OneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG, OneSignal.LOG_LEVEL.DEBUG);
    
    window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  window.plugins.OneSignal
    .startInit("8388c0ef-1492-4892-9296-17091773564c")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);
}