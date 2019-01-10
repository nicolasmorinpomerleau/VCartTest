var tentative = 0;
var nouveuMessage;

//function ListeDesMarchands(){
//$.ajax({
//  dataType: "json",
//  url: "https://s3-eu-west-1.amazonaws.com/virtualcard/marchand.json",
////  data: data,
//  success: function(data) {
//$('#Restauration').empty();
//            $('#Restauration').append(data[0].restauration);
//            
//            $('#Service').empty();
//            $('#Service').append(data[0].Service);
//                
//            $('#Mobilier').empty();
//            $('#Mobilier').append(data[0].Mobilier);
//                
//            $('#provinciaux').empty();
//            $('#provinciaux').append(data[0].provinciaux);
//
//             console.log(data[0]);  }
//});

//};
function ListeDesMarchands(){
    $.getJSON("https://s3-eu-west-1.amazonaws.com/virtualcard/restauration.json",function(data,status){
            $('#restauration').empty();
            $('#restauration').append(data[0].restauration);
            $('#restauration').listview('refresh'); /* to refresh the div */

    });
    
    $.getJSON("https://s3-eu-west-1.amazonaws.com/virtualcard/provinciaux.json",function(data,status){
            $('#provinciaux').empty();
            $('#provinciaux').append(data[0].provinciaux);
            $('#provinciaux').listview('refresh');

    });
    
    $.getJSON("https://s3-eu-west-1.amazonaws.com/virtualcard/mobilier.json",function(data,status){
            $('#mobilier').empty();
            $('#mobilier').append(data[0].mobilier);
            $('#mobilier').listview('refresh');

    });
    
    $.getJSON("https://s3-eu-west-1.amazonaws.com/virtualcard/service.json",function(data,status){
            $('#service').empty();
            $('#service').append(data[0].service);
            $('#service').listview('refresh');
    });
    
    $.getJSON("https://s3-eu-west-1.amazonaws.com/virtualcard/service.json",function(data,status){
            $('#autre').empty();
            $('#autre').append(data[0].autre);
            $('#autre').listview('refresh');
    });
};


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
    url:'https://5m1qfi37ie.execute-api.eu-west-1.amazonaws.com/Dev/emailCode',

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
    localStorage.Email         = email;
    localStorage.code          = code;
    localStorage.name          = res.info.name;
    localStorage.compagny      = res.info.company;
    localStorage.membreNumber  = "#"+res.info.memberNumber;
    window.location.href = "#page2";
    }
    else{
        window.location.href = "#page1";
        if(res.answer == 'userNotFind'){
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
    }
  },
error: function(res) {
 alert("Erreur de lecture: "+ res.message);
}
});
}