var tentative = 0;
var nouveuMessage;


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


$(function(){
        if(localStorage.Email!=undefined && localStorage.code != undefined){
            nameID               = document.getElementById("name");
            nameID.innerHTML     = localStorage.name;
            compagnyID           = document.getElementById("compagny");
            compagnyID.innerHTML = localStorage.compagny; 
            numeroID             = document.getElementById("Numero");
            numeroID.innerHTML   = localStorage.membreNumber;
            window.location.href = "#page2";
            }
         else{
            window.location.href = "#page1";
            }
});

function Validate(){        
    email = document.getElementById('email').value;
    code  = document.getElementById('code').value; 
    
    $.ajax({
//            url: 'http://localhost:4000/check',
    url:'https://5m1qfi37ie.execute-api.eu-west-1.amazonaws.com/Dev/emailCode',
//            url:'https://facjip5ul0.execute-api.us-east-2.amazonaws.com/default/VCartFunction',            
            
//         url: '192.168.1.66/check',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({email, code}),
            
    success: function(res) {
    if(res.answer == 'userFind'){
    nameID               = document.getElementById("name");
    nameID.innerHTML     = res.info.name;
    compagnyID           = document.getElementById("compagny");
    compagnyID.innerHTML = res.info.company;
    numeroID           = document.getElementById("Numero");
    numeroID.innerHTML =   "#"+res.info.memberNumber;
//    Numero.innerHTML     = "#"+res.info.memberNumber;
    //                Save user data in local Storage
    localStorage.Email         = email;
    localStorage.code          = code;
    localStorage.name          = res.info.name;
    localStorage.compagny      = res.info.company;
    localStorage.membreNumber  = "#"+res.info.memberNumber;
//                    Numero.innerHTML = "Veuillez <a href="+'tel:418 228-7879'+"> tél: 418 228-7879</a>";
    window.location.href = "#page2";
    }
    else if(res.answer == 'userNotFind'){
        tentative = tentative +1;
        if(tentative < 3){
            var myCollection = document.getElementsByTagName("label");
            if(tentative==1){
               myCollection[4].innerHTML = "Le Courriel ou le code n'est pas correct, veuillez réessayer de nouveau.";
            }
            else{
               myCollection[5].innerHTML = "Le Courriel ou le code n'est pas correct, veuillez réessayer de nouveau.";
            }
        }
        else{
            var myCollection = document.getElementsByTagName("label");
            myCollection[5].innerHTML = "Veuillez contacter l'administration de la Chambre de Commerce de Saint-Georges, <a href=tel:418 228-7879> tél: 418 228-7879</a>";
        }
    }
  },
error: function(res) {
 alert("Erreur de lecture: "+ res.message);
}
});
}