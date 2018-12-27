

// Add to index.js or the first page that loads with your app.
// For Intel XDK and please add this to your app.js.
$(document).ready(function() {
    
//    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
//        document.addEventListener("deviceready", onDeviceReady, false);
//                alert(" Device ready");
//
//    } else {
//        onDeviceReady();
//                alert(" Device ready not");
//
//    };
    
document.addEventListener("deviceready", onDeviceReady, false);
//        alert(" Device ready");
});
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  function onDeviceReady(){

    var notificationOpenedCallback = function(jsonData) {
//        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
//    alert(" Init ready");
//      window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      window.plugins.OneSignal
        .startInit("8388c0ef-1492-4892-9296-17091773564c")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
};



