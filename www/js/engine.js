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
    
//    location.reload(true);
};

//function Construct(data){
////    for(i=0; i<data.length; i++){
////        for(j=0;j<data[i].length;j++){
////            $('#Restauration').append(Construct(data[i][j]));
////         }
////        }
//
//    return data[0].Marchand1;
//};

//function Storage(){
//$('#myFrame').attr('src', "http://amcreatives.ca/VircaPages/");
//document.getElementsByTagName('iframe')src="http://amcreatives.ca/VircaPages/"
    
//   $.getJSON("http://amcreatives.ca/files/test.json",function(data){
//     alert(data[0].Marchand1);
//      alert(status);
//
//    });
    
//      $.getJSON("http://amcreatives.ca/files/test.json", function(result){
//    $.each(result, function(i, field){
//      $("div").append(field + " ");
//    }); https://s3-eu-west-1.amazonaws.com/virtualcard/marchand.json
//  });
    

//}

//$(document).ready(function() {
//    $('#myFrame').attr('src', "http://amcreatives.ca/VircaPages/");
//    
//       $.getJSON("http://amcreatives.ca/files/test.json",function(data){
//      alert(data);
//    });
//    
//      $("#boutton").click(function(){
//    $.getJSON("https://s3-eu-west-1.amazonaws.com/virtualcard/marchand.json", function(result){
//      $.each(result, function(i, field){
//          alert(field);
//        $("div").append(field + " ");
//      });
//    });
//  });
//
//});

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
//        While(cond2!="fine")  {
//            ajax{
//                poste
//                ...
//                success:
//               cond2
//                
//            }
//        }
//    console.log
        
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