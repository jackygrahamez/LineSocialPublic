function googleAnalytics(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-46446487-2', 'linesocial.mobi');
    ga('send', 'pageview');  
}


function homeFormat() {
/* home */

if ($("body").hasClass("home")) {
  console.log("home");

  if ($(".cID").attr("value") != "undefined") {
    autocheckout();
  } 

  var username = $(".username").attr("value");
  var notification_url = "/"+username+"/user_notifications/"; 
  console.log("notification_url "+notification_url);
  getNotifications(notification_url);
  checkInviteCode();

}       

     
     $(".login a").click(function(e){
       e.preventDefault();
       var url = $(this).attr("href");
       console.log("url "+url);
       if (url.indexOf("notifications") > 0) {
         $(".notifications").addClass("active");
       }     
       else if ($(this).hasClass("facebook")) {
            location.assign(url);
       }        
       else {
          if (url.indexOf("messages") > 0) {
          global_cID = $(this).children().children().children("#cID").attr("value");
          global_fID = $(this).children().children().children("#fID").attr("value");
          global_tID = $(this).children().children().children("#tID").attr("value");
          global_toUser = $(this).children().children().children(".name").text(); 
          var tester = $(this).children().children().children("#tester").attr("value"); 
          var session_id = $(this).children().children().children("#session_id").attr("value");
          getMessages(global_cID, global_fID, tester, session_id, url);         
        }
        else if (url.indexOf("user_lines") > 0) {
          console.log("user_lines");
            $('html, body').animate({scrollTop:top - 50}, 'slow');  
            var loader = '<div class="loader" style="'
              +"position: fixed;"
              +"height: 100%;"
              +"width: 100%;"
              +"top: 40px;"
              +"left: 0px;"
              +"background: rgba(0,0,0, 0.2);"
              +'"><div></div></div>';
           if ($("body > canvas").length < 1) {
             $("body").append(loader);
             $(".loader > div").canvasLoader();
             getLocation(0, url);                
           }          
        }
        else {
            getPage(url);
         }  
       }  
     });   
}

function contactFormat() {
/* contact */

  var shape = $(".contact_captcha_shape").attr("value");
  var name = $(".contact_captcha_name").attr("value");
  var email = $(".contact_captcha_email").attr("value");
  var message = $(".contact_captcha_message").attr("value");
  var error = $(".contact_captcha_error").attr("value");
  var send_message = $(".contact_captcha_send_message").attr("value");

  if (error != "mc-invalid") { error = ""; }

    if ($("section").hasClass("password_reset")) {
    $('#captcha').motionCaptcha(shape);    
    }

    $(".footer li[name='contact']").click(function(){
        $("#captcha").remove(); 
    var contact_form = '<form id="captcha" method="POST" action="/contact">' +
        ' <input type="text" id="contactName" name="name" placeholder="'+name+'"> '+
        ' <input type="email" id="contactEmail" name="email" placeholder="'+email+'"> '+
        ' <input type="text" id="contactMessage" name="message" placeholder="'+message+'"> '+
        '<div id="mc">'+
        '    <canvas id="mc-canvas" class="'+error+'"></canvas>'+
        '</div>'+  
        '<input id="submit" type="submit" value="'+send_message+'">'+
        '</form>';
        $(".footer li.contact").append(contact_form); 
        $('#captcha').motionCaptcha(shape);
    });  
}

function teleFormat() {
   $("input[name='telephone']").intlTelInput();  
}

function themeFormat() {
   //Themes
   $("menu.themes li").click(function(){
     $(this).siblings().removeClass("active");
     $(this).addClass("active");
     var themeColor = $(this).attr("rel");
     setActiveStyleSheet(themeColor);
   });  
}

function fbHashRemove() {
   //REMOVE FB HASH
   if (window.location.href.indexOf('#_=_') > 0) {
      window.location = window.location.href.replace(/#.*/, '');
  }   

}

function termsClick() {
   $("input[name='terms']").click(function(){
     $(this).removeClass("invalid");
     $("form label").removeClass("invalid");
   });  
   //TERMS
   $("menu.footer li").click(function(){
   if (!$(this).hasClass("expanded")) {
       var section = $(this).next();
       if ($(section).hasClass("expanded")) {
         $(this).removeClass("down");
         $(section).removeClass("expanded");
       }
       else {
         $(".down").removeClass("down");
         $(".expanded").removeClass("expanded");
         $(this).addClass("down");
         $(section).addClass("expanded");
         
         var top =  $(section).position().top;
         $('html, body').animate({scrollTop:top - 50}, 'slow');      
       }     
   }
   });   
}

function formatPage() {
$("input, textarea").focus(function(){
  $(this).css("color", "black");
});
   
$(".back.button").click(function(){
  $(".body").last().removeClass("active"); 
  $(".checkin").remove();
});

$(".forgot_password div.back.button, .forgot div.back.button").click(function(){
  location.assign("/");
});

$("html").removeClass("disabled");

}

function autocheckout() {
   setInterval(function(){
     getLocation(1);
   },60000);  
} 

function getLocation(lLength, pURL)
  {
  lURL = pURL;
  $("ul.checkin").canvasLoader();
  lineLength = lLength;
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}


  }
function showPosition(position)
  {
  
  var coord = position.coords.latitude+","+position.coords.longitude;
  global_coords = [position.coords.latitude+","+position.coords.longitude];
  global_coords_lat = position.coords.latitude;
  global_coords_lon = position.coords.longitude;
    if (parseInt(lineLength) > 1) {
      var url = location.pathname+"/venues/";
      getVenues(url, coord);      
      $("#coords").val(position.coords.latitude+", "+position.coords.longitude);
      $("#line_length").val(lineLength);    
    } else if (lineLength == 1) {
      var d = new Date()
      var url = location.pathname+"/auto_checkout/";
      //console.log("position "+JSON.stringify(position));
      auto_checkout(url, position.coords.latitude, position.coords.longitude);
    } 
    else {
      getLines(lURL);
    }
  }
function showError(error)
  {
  if ( $("body > header p.invalid").length  < 1 ) {
    $("body > header").append("<p class='invalid'></p>");   
  }
  if ( $(".body > header p.invalid").length  < 1 ) {
    $(".body > header").append("<p class='invalid'></p>");    
  }
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
          $("header p.invalid").replaceWith("<p class='invalid'>Please enable location services for https://alpha.linesocial.mobi in your browser settings.</p>");
          $(".loader").remove();
          $("canvas").remove();
          break;
    case error.POSITION_UNAVAILABLE:
          $("header p.invalid").replaceWith("<p class='invalid'>Location information is unavailable.</p>");
          $(".loader").remove();
          $("canvas").remove();
          break;
    case error.TIMEOUT:
          $("header p.invalid").replaceWith("<p class='invalid'>The request to get user location timed out.</p>");
          $(".loader").remove();      
          $("canvas").remove();
          break;
    case error.UNKNOWN_ERROR:
          $("header p.invalid").replaceWith("<p class='invalid'>An unknown error occurred.</p>");
          $(".loader").remove();          
          $("canvas").remove();
          break;
    }
  }
  function getPage(url) {
       $.ajax({ 
             url: url,
             type: 'GET',
             cache: false, 
             success: function(data){
                markup = data;
                $("section.body.right").html(data);
                setTimeout(function(){
                $("section.body.right").addClass("active");
                  $("section.content").css("height", "0px");
                  if (url === "#share") {
                    $(".body.right.active").prepend("<div class='container hero-unit'><h2>Social Share</h2></div>");
                    $('html, body').animate({scrollTop:top - 50}, 'slow');  
                    $(".back.button").click(function(){
                      $(".body").removeClass("active");
                      $("section.checkin").remove();
                      $("section.content").css("height", "auto");
                      $("section.body.right").html("");
                      });   
                  }
                  else {
                    $(".back.button").click(function(){
                      $(".body").removeClass("active");
                      $("section.checkin").remove();
                      $("section.content").css("height", "auto");
                      });                     
                  }
                }, 1000);                                 
             }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 console.log('text status '+textStatus+', err '+err);            }
          });
 }        

function getNotifications(url) {
       $.ajax({ 
             url: url,
             type: 'GET',
             cache: false, 
             success: function(data){
                markup = data;
                $("body .body").last().after(data);
                setTimeout(function(){
                  $(".back.button").click(function(){
                  $("section.notifications").removeClass("active"); 
                  });               
                }, 1000);                                 
             }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 console.log('text status '+textStatus+', err '+err);
             }
          });
 }            

function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

function getVenues(url, coord) {
  var availableTags = [];
    $(".checkin #wrapper > p").addClass("hide");
       $.ajax({ 
             url: url,
             type: 'POST',
             cache: false,
             data: { coordinates: coord},
             success: function(data){
                ajaxData = data;
                  html = "";
                for(var i=0; i<data.length; i++) {
                  if(typeof(data[i].name) != 'undefined') {
                    html += "<li><span>"+data[i].name+"</span></li>";
                    availableTags.push(data[i].name);
                  }
                  
                }
                
              $( "#location" ).autocomplete({
                    source: availableTags
               });
                //$(".venues").html(html);
              $("form").removeClass("hide");
              $("canvas").addClass("hide");
             $("#checkin").click(function(e){
             var location = $("#location").val(),
             geolocation  = $("#coords").val(),
             //geolocation  = global_coords,
             line_length     = $("#line_length").val();
             var url = $("form.checkin").attr("action");
             checkIn(location, geolocation, line_length, global_coords_lat, global_coords_lon, url);
           });
             $("input, textarea").focus(function(){
               
               $(this).css("color", "black");
             });             
                
             }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 console.log('text status '+textStatus+', err '+err);
             }
          });
 }  

function updatePassword(id, password, url, telephone) {
  if (telephone == "") {
    telephone = " ";
  }
       $.ajax({ 
             url: url,
             type: 'POST',
             cache: false,
             data: { 
               id: id,
               password: password,
               telephone: telephone },
             success: function(data){ 
               if (data === "password updated!") {
                 $(".body .back").click();
               }
             }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 console.log('text status '+textStatus+', err '+err);
             }
          });
 }  

 function userRegister(email, password, firstName, lastName, username, telephone, invite_code) {
  var url = "/register";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             email: email,
             password: password,
             firstName: firstName,
             lastName: lastName,
             username: username,
             telephone: telephone,
             invite_code: invite_code},
           success: function(data){ 
             if (data == 'Account was created') {
               location.replace(location.origin);
             } else {
               $("form > p").first().replaceWith(data);
             }
              
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 

function regCheck(username) {
  var url = "/register_value";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             username: username},
           success: function(data){ 
             if (data == "username taken") {
               $("input[name='username']").addClass("invalid");
             } else {
               $("input[name='username']").removeClass("invalid");
             }
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}  


function grantPoints(cID, user_id) {
  var url = "/grant_points";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             cID: cID,
             user_id: user_id},
           success: function(data){ 

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}  

function sendPoints(fID, tID, points) {
  var url = "/send_points";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             points: points,
             fID: fID,
             tID: tID},
           success: function(data){ 

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 



function regCheckEmail(email) {
  var url = "/register_email_value";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             email: email},
           success: function(data){ 
             if (data == "email taken") {
               $("input[name='email']").addClass("invalid");
             } else {
               $("input[name='email']").removeClass("invalid");
             }
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}  

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};
function updateMessages(timestamp, cID, fID, tID, messages, user, tester, url) {
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             ts: timestamp,
             cID: cID,
             fID: fID,
             tID: tID,
             user: user,
             messages: messages,
             tester: tester},
           success: function(data){ 
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 

function updateNotificationMessages(cID, fID, messages, url, requests) {
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             cID: cID,
             fID: fID,
             messages: messages,
             requests: requests},
           success: function(data){ 

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
} 

function getMessages(cID, fID, tester, session_id, url) {
    $.ajax({ 
          url: url,
          type: 'POST',
          cache: false,
          data: { 
           cID: cID,
           fID: fID,
           tester: tester,
           session_id: session_id },
           success: function(data){
                markup = data;
                $("section.body.right").html(data);
                setTimeout(function(){
                $("section.body.right").addClass("active");
                  $(".back.button").click(function(){
                  $(".body").removeClass("active");
                  $("section.checkin").remove();
                  });               
                }, 1000);                                 
             }
          , error: function(jqXHR, textStatus, err){
              //alert('text status '+textStatus+', err '+err)
              console.log('text status '+textStatus+', err '+err);
          }
       });
} 

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkIn(location, geolocation, line_length, global_lat, global_lon, url) {

  if((location.length > 0) && (geolocation.length > 0) && (line_length.length > 0)) {
       $.ajax({ 
             url: url,
             type: 'POST',
             cache: false, 
             data: { location: location, geolocation: geolocation, line_length: line_length, lat: global_lat, lon: global_lon }, 
             success: function(data){
                markup = data;
                //alert('Success!');
                $("#demo").html(data);
                global_cID = data;
                autocheckout();
                $(".checkin.active .back").click();
                $(".line_pokes > div").remove();
                $(".chat_requests > ul > li").remove();
             }
             , error: function(jqXHR, textStatus, err){
                 console.log('text status '+textStatus+', err '+err);
             }
          });
  }     
 } 

function auto_checkout(url, lat, lon) {
  if(lat) {
       $.ajax({ 
             url: url,
             type: 'POST',
             cache: false, 
             data: { lat: lat,
                   lon: lon}, 
             success: function(data){
                markup = data;
                if (data === "checkout") {
                var interval_id = window.setInterval("", 9999); // Get a reference to the last
                    // interval +1
          for (var i = 1; i < interval_id; i++)
          window.clearInterval(i);
          //for clearing all intervals
                  
                }
                //alert('Success!');
             }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 //console.log('text status '+textStatus+', err '+err);
             }
          });
  }     
 }

function sendUnsubscribe(unsubscribe) {
  if(unsubscribe) {
       $.ajax({ 
             url: "/unsubscribe",
             type: 'POST',
             cache: false, 
             data: { unsubscribe: unsubscribe}, 
             success: function(data){
                //console.log("unsubscribe "+data);
                getPage(data);
             }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 //console.log('text status '+textStatus+', err '+err);
             }
          });
  }     
 }


function captchaInviteFriend(points, url, email, name) {
  console.log("points "+points);
  console.log("url "+url);
  console.log("email "+email);
  console.log("name "+name);
       $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             _points: points,
             email: email,
             name: name
             },
           success: function(data){ 
                markup = data;
                $("section.body.right").html(data);
                setTimeout(function(){
                $("section.body.right").addClass("active");
                $("section.content").css("height", "0px");
                  $(".back.button").click(function(){
                    $(".body").removeClass("active");
                    $("section.checkin").remove();
                    $("section.content").css("height", "auto");
                    });                     
                  
                }, 1000);              

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}

function captchaPoints(_points, url) {
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             _points: _points
             },
           success: function(data){ 
                markup = data;
                $("section.body.right").html(data);
                setTimeout(function(){
                $("section.body.right").addClass("active");
                $("section.content").css("height", "0px");
                  $(".back.button").click(function(){
                    $(".body").removeClass("active");
                    $("section.checkin").remove();
                    $("section.content").css("height", "auto");
                    });                     
                  
                }, 1000);              

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}

function codeValidate(code, url) {
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             code: code
             },
           success: function(data){ 
                markup = data;
                $("section.body.right").html(data);
                setTimeout(function(){
                $("section.body.right").addClass("active");
                $("section.content").css("height", "0px");
                  $(".back.button").click(function(){
                    $(".body").removeClass("active");
                    $("section.checkin").remove();
                    $("section.content").css("height", "auto");
                    });                     
                  
                }, 1000);              

           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });
}

function getLines(url) {  
   if (typeof(global_coords_lat)!="undefined" && typeof(global_coords_lon)!="undefined") {
     setTimeout(function(){
       $.ajax({ 
             url: url,
             type: 'POST',
             cache: false,
             data: { 
               lat: global_coords_lat,
               lon: global_coords_lon},
               success: function(data){
                  if (data != null ) {
                      $("section.body.right").html(data);
                      if(!$("section.notifications").hasClass("active")) {
                        $("section.notifications").addClass("hide");
                    }                       
                      setTimeout(function(){
                      $("body > .loader").remove();
                      $("section.body.right").addClass("active");
                        $(".back.button").click(function(){
                        $(".body").removeClass("active");
                        $("section.checkin").remove();
                        $("section.notifications").removeClass("hide");                         
                        });               
                      }, 1000);                   
                  } else {
                    if ( $("body > header p.invalid").length  < 1 ) {
                      $("body > header").append("<p class='invalid'></p>");   
                    }
                    if ( $(".body > header p.invalid").length  < 1 ) {
                      $(".body > header").append("<p class='invalid'></p>");    
                    }
                            $("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>");
                            $(".loader").remove();
                            $("canvas").remove();
                  }         
                 }
             , error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 console.log('text status '+textStatus+', err '+err);
                 if ( $("body > header p.invalid").length  < 1 ) {
                $("body > header").append("<p class='invalid'></p>");   
                }
                if ( $(".body > header p.invalid").length  < 1 ) {
                  $(".body > header").append("<p class='invalid'></p>");    
                }
                        $("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>");
                        $(".loader").remove();
                        $("canvas").remove();                
                },
                 timeout: 10000,
                 async: false            
          });   
     }, 100);
   }  else {
     setTimeout(function(){
       $.ajax({ 
             url: url,
             type: 'POST',
             cache: false,
             data: { 
               lat: "",
               lon: "" },
               success: function(data){
                 if (data != null ) {
                    $("section.body.right").html(data);
                    setTimeout(function(){
                    $("section.body.right").addClass("active");
                      $(".back.button").click(function(){
                      $(".body").removeClass("active");
                      $("section.checkin").remove();
                      });               
                    }, 1000);  
                 } else {
                    if ( $("body > header p.invalid").length  < 1 ) {
                      $("body > header").append("<p class='invalid'></p>");   
                    }
                    if ( $(".body > header p.invalid").length  < 1 ) {
                      $(".body > header").append("<p class='invalid'></p>");    
                    }
                            $("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>");
                            $(".loader").remove();
                            $("canvas").remove();
                  }         
                 }, error: function(jqXHR, textStatus, err){
                 //alert('text status '+textStatus+', err '+err)
                 console.log('text status '+textStatus+', err '+err);
             },
              timeout: 10000,
              async: false     
          }); 
     }, 100);
   }
}  

function deviceType(callback) {
    var ua = navigator.userAgent;
    var checker = {
      iphone: ua.match(/(iPhone|iPod|iPad)/),
      windows_phone: ua.match(/IEMobile/),
      android: ua.match(/Android/)
    };
    if (checker.android){
        $('html').addClass("android");
    }
    else if (checker.iphone){
        $('html').addClass("iphone");
        callback();        
    }
    else if (checker.blackberry){
        $('html').addClass("blackberry");
    }
    else if (checker.windows_phone){
        $('html').addClass("IEMobile");
    }
}



function iosCheckbox() {
  //iOS checkbox
    $('.on_off :checkbox').iphoneStyle();
    $('.disabled :checkbox').iphoneStyle();
    $('.css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
    $('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
    var onchange_checkbox = ($('.onchange :checkbox')).iphoneStyle({
        onChange: function(elem, value) { 
          $('span#status').html(value.toString());
        }
      });    
}    
   

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}


function checkPageParameters(){
  var page = null;
  var path = null;
  var email_validation = getURLParameter("email_validation");
  var telephone_validation = getURLParameter("telephone_validation");

  if (email_validation) {
    codeValidate( email_validation, "/send_validate_email_code");
  }

  if (telephone_validation) {
    codeValidate( telephone_validation, "/send_validate_phone_code");
  }

  try {
    path = location.pathname;
    page = getURLParameter("pagename");
  }
  catch(err) {
    console.log("could not find parameter pagename");   
  } 

   // redirect to notifications
   setTimeout(function(){
     $(".overlay").hide();
     
     if (page === "user_notifications") {
      console.log("user_notifications");
       $("a[href$='user_notifications/']").click();
     }     
   }, 1000);  
}

function checkInviteCode() {
  var invite_code_cookie = getCookie("invite_code");
    var invite_code_db = $("input[name='invite_code']").attr("value"),
    username = $("input[name='username']").attr("value");
      if (invite_code_db === undefined) {
        if (invite_code_cookie) {
          fbInviteCode(username, invite_code_cookie);          
        }
      }
}

function fbInviteCode(username, invite_code) {
  var url = "/"+username+"/fb_invite_code/";
     $.ajax({ 
           url: url,
           type: 'POST',
           cache: false,
           data: { 
             invite_code: invite_code},
           success: function(data){ 
            console.log("data invite_code "+data);
           }
           , error: function(jqXHR, textStatus, err){
               //alert('text status '+textStatus+', err '+err)
               console.log('text status '+textStatus+', err '+err);
           }
        });  
}


function notificationsModule() {
  var message_from = $(".message_from").attr("value");

    global_tID = "";  
    var messages = [];
    var socket = io.connect(location.origin);
    var field = $(".field.notfications");
    var sendButton = $(".send.notifications");
    var content = $(".content.notifications");
    var name = $(".send.notifications"); 
    var match = false;    
  $(".notifications.controls .cID").val(global_cID);
  $(".notifications.controls .tID").val(global_tID);
  global_cID = $(".notifications.controls .cID").val();   
  global_fID = $(".notifications.controls .fID").val();
  /*  
  if ($(".content.notifications").text().length > 0) {
    $(".accordion").removeClass("off");
    $("notifications.controls .send").click();
  }
  */    
  var nPokes = $(".chat_requests ul li").length;
  
  if (parseInt(nPokes) > 0) {
  $(".line_pokes div").text(nPokes);    
  }
  
  if ($(".notifications.content div").length > 0 && $(".chat_requests > ul > li").length < 1) {
  var fIDlist = [];  
  $(".notifications.content div").each(function(){
    if ( ($(this).attr("fid") != $(".notifications.fid").attr("value")) && 
    ($(this).attr("name") != $(".name.notifications").attr("value")) ) {
      fIDlist.push($(this).attr("name")+"_"+$(this).attr("fid"));
    }
  });
  var fIDlistArrayUnique = ArrNoDupe(fIDlist);
  var chat_requests = "";
    if (fIDlistArrayUnique.length > 0) {
      $(".line_pokes div").replaceWith("<div>"+fIDlistArrayUnique.length+"</div>");
        //$(".chat_requests ul").replaceWith("<li></li>");
          for(var i=0; i<fIDlistArrayUnique.length; i++) {
              var ufID = fIDlistArrayUnique[i].split("_").pop();
              fIDlistArrayUnique[i].split("_").pop();
              chat_requests += '<li ufid="'+ufID+'">'+message_from +' ' + fIDlistArrayUnique[i].split("_")[0] + '</li>';
            }
            $(".chat_requests ul").html(chat_requests);
    } else {
      $(".line_pokes div").addClass("hide");
    } 
  }
  
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = $(".content.notifications").html();
            var chat_requests = '';            
            var fIDlist = [];
            var sender = "bubbledLeft";
      global_cID = $(".notifications.controls .cID").attr("value");
      global_fID = $(".notifications.controls .fID").attr("value");              
      global_tID = $(".notifications.controls .tID").attr("value");
      socket.emit("newUser", global_fID);
              for(var i=0; i<messages.length; i++) {
              if ($(".notifications.controls .cID").attr("value") == messages[i].cID) {
                if (typeof(messages[i].username) != 'undefined') {
                $(".content.notifications div").each(function(){                    
                  if ($(this).attr("ts") == messages[i].ts) {
                    match = true;
                  }
                });      
                $(".chat_requests ul li").each(function(){                    
                  if ($(this).attr("ufid") == messages[i].ts) {
                    match = true;
                  }
                });                       
              if (!match) { 
                  if (messages[i].fID != $(".notifications.controls .fID").attr("value")) { 
                  fIDlist.push(messages[i].username+"_"+messages[i].fID);
                    }
                    if (messages[i].fID === $(".fID.notifications").attr("value")) {
                    sender = "bubbledRight";
                    }
                var d = new Date();
                var h = d.getHours();
                var td = "am";
                if (h > 12) { 
                h = h - 12;
                td = "pm"; 
                }
                var m = d.getMinutes();
                m = checkTime(m);   
              var time = " " + h + ":" + m + " "+td;                    
                    html += '<div ts="'+messages[i].ts+'" class="'+sender+'" name="'+messages[i].username+'" cID="'+messages[i].cID+'" fID="'+messages[i].fID+'" tID="'+messages[i].tID+'"><span><b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                    html += messages[i].message + ' <time>' + time + '</time></span></div>';

                }
                match = false;                
                  }
          }
              }
         var fIDlistArrayUnique = ArrNoDupe(fIDlist);
         if (html.length > 0) {        
              $(".content.notifications").html(html);
        $('.content.notifications').stop().animate({
          scrollTop: $(".content.notifications")[0].scrollHeight
        }, 800);              
           }
           if (fIDlistArrayUnique.length > 0) {
              $(".line_pokes div").replaceWith("<div>"+fIDlistArrayUnique.length+"</div>");
           } else {
              $(".line_pokes div").addClass("hide");
           }
           if (global_tID) {
              $(".accordion .content.notifications p").each(function(){
                if (($(this).attr("fid") == global_tID) || ($(this).attr("tid") == global_tID)) {
                  $(this).show();
                }
                else {
                  $(this).hide();
                }
              });
           }
           var chat_requests = $(".chat_requests ul").html();
            for(var i=0; i<fIDlistArrayUnique.length; i++) {
              var ufID = fIDlistArrayUnique[i].split("_").pop();
              fIDlistArrayUnique[i].split("_").pop();
              if ((ufID != $(".notifications.fid").attr("value")) &&
                  ($(".chat_requests ul li[ufid='"+ufID+"']").length < 1)) {
                  chat_requests += '<li ufid="'+ufID+'">Message from ' + fIDlistArrayUnique[i].split("_")[0] + '</li>';
                  $(".chat_requests ul").append(chat_requests);
                  $(".chat_requests ul > li").unbind("click");
                $(".chat_requests ul > li").click(function() {
                var notification_class = $(this).attr("ufid");
                global_tID = notification_class;
            $(".notifications.controls .tID").attr("value", global_tID);            
                $(".accordion").toggleClass("off");
                $(".accordion div").hide();
                $(".accordion ."+notification_class).show();
            $('.content.notifications').stop().animate({
              scrollTop: $(".content.notifications")[0].scrollHeight
            }, 800);            
                  $(".accordion .content.notifications div").each(function(){
                    if (($(this).attr("fid") == global_tID) || ($(this).attr("tid") == global_tID)) {
                      $(this).show();
                    }
                    else {
                      $(this).hide();
                    }
                  });    
                var all_content = $(".content").html();
                var requests = $(".chat_requests > ul ").html();    
                var url = "/"+name.value+"/update_notification_messages/";
                global_fID = $(".message.controls .fID").attr("value"); 
                global_cID = $(".message.controls .cID").attr("value");           
          //updateNotificationMessages(global_cID, global_fID, all_content, url, requests);                         
             });   
              }             
            }


            if (chat_requests.length > 0) {
              $(".chat_requests ul").html(chat_requests);
          }     
  
         $(".chat_requests ul li").click(function() {
            var notification_class = $(this).attr("ufid");
            global_tID = notification_class;
        $(".notifications.controls .tID").attr("value", global_tID);            
            $(".accordion").toggleClass("off");
            //$(".accordion div").hide();
            $(".accordion ."+notification_class).show();
        $('.content.notifications').stop().animate({
          scrollTop: $(".content.notifications")[0].scrollHeight
        }, 800);            
              $(".accordion .content.notifications div").each(function(){
                if (($(this).attr("fid") == global_tID) || ($(this).attr("tid") == global_tID)) {
                  $(this).show();
                }
                else {
                  $(this).hide();
                }
              });                     
         });            

        } else {
            console.log("There is a problem:", data);
        }
    });
 
    $(".send.notifications").click(function() {
      var d = new Date();
        if(name.value == "") {
            alert("Please type your name!");
        } else {
          var d = new Date();
          var h = d.getHours();
          var td = "am";
          if (h > 12) { 
          h = h - 12;
          td = "pm"; 
          }
          var m = d.getMinutes();
          m = checkTime(m);   
        var time = " " + h + ":" + m + " "+td;
            var text = $(".field.notifications").val();
        var timestamp = d.getTime();            
        var user = $(".name.notifications").val();  
        html = "";
        //text = text + time;         
      var tID = $(".notifications.controls .tID").attr("value");
        var cID = $(".notifications.controls .cID").attr("value");      
        var fID = $(".notifications.controls .fID").attr("value"); 
            socket.emit('send', { ts: timestamp, cID: cID, fID: fID, tID: tID, message: text, username: user });
            var url = "/"+name.value+"/update_messages/";
            updateMessages(timestamp, cID, fID, tID, text, user, url);
      $(".field.notifications").val("");         
            text = "";              
        }
    });
 
}

function registerForm() {
//Register
   $(".register input").focusout(function(){
     var object = $(this);
     if (object.val().length > 0) {
       object.removeClass("invalid");
     }
   });
       
   $(".register input[name='username']").focusout(function(){
     var username = $(this).val();

     if (username.length > 0) {
       regCheck(username);
     }
   });
   
   $(".register input[name='email']").focusout(function(){
     var email = $(this).val();
     
     if (email.length > 0) {
       var value = {email:email};
       regCheckEmail(email);
     }
   });   
 }  

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
    {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
  return "";
}

//redirect domain
function redirectDomain() {
  if ((location.href.indexOf("alpha.") < 0) && ((location.href.indexOf("localhost") < 0))) {
    if (page && path) {
      location.replace("https://alpha.linesocial.mobi/"+location.pathname+"?"+page);      
      
    } else {
      location.replace("https://alpha.linesocial.mobi");      
    }
  }
}

/* canvas loader */
function PageLoader() {
  addthis.init();
  var invalid = getURLParameter('invalid');
  $(".overlay > div").canvasLoader();

  setTimeout(function() {
    $(".overlay").remove();
      setTimeout(function() {
      $(".overlay > canvas").remove();
    if (invalid) {
      $("#inputPassword").after("<label class='invalid'>Invalid Login</label>");
      $("input").addClass("invalid");
    }     
      }, 1000);
    }, 3000);
}

function subPageLoad() {
var x=document.getElementById("demo");
  $(document).ready( function(){

     setTimeout(function(){
     $("menu.themes li").click(function(){
       $(this).siblings().removeClass("active");
       $(this).addClass("active");
       var themeColor = $(this).attr("rel");
       setActiveStyleSheet(themeColor);
     });
     
     $("menu.themes > li").first().addClass("active");
     }, 1000);
     
     $("link").each(function(){ 
       if(!$(this).attr("disabled") && ( $(this).attr("title") != undefined)) {
         var theme = $(this).attr("title");
         $(".themes li[rel='"+theme+"']").click();
       } 
    });      
     

     $("input[type='text'], textarea").focus(function(){
       $(this).css("color", "black");
     });     
     
     $("input, textarea").focus(function(){
       
       $(this).css("color", "black");
     });     
     
     
     $("a").click(function(e){
       e.preventDefault();
       var url = $(this).attr("href");
       if (url.indexOf("notifications") > 0) {
         $(".notifications").addClass("active");
       }     
       else {
          if (url.indexOf("messages") > 0) {
          global_cID = $(this).children().children().children("#cID").attr("value");
          global_fID = $(this).children().children().children("#fID").attr("value");
          global_tID = $(this).children().children().children("#tID").attr("value");
          global_toUser = $(this).children().children().children(".name").text(); 
          var tester = $(this).children().children().children("#tester").attr("value"); 
          var session_id = $(this).children().children().children("#session_id").attr("value");
          getMessages(global_cID, global_fID, tester, session_id, url);         
        }
        else if ($(this).hasClass("logout")) {
          location.href="/";
        }
        else if (url.indexOf("user_lines") > 0) {
          console.log("user_lines");
            $('html, body').animate({scrollTop:top - 50}, 'slow');  
            var loader = '<div class="loader" style="'
              +"position: fixed;"
              +"height: 100%;"
              +"width: 100%;"
              +"top: 40px;"
              +"left: 0px;"
              +"background: rgba(0,0,0, 0.2);"
              +'"><div></div></div>';
           if ($("body > canvas").length < 1) {
             $("body").append(loader);
             $(".loader > div").canvasLoader();
             getLocation(0, url);                
           }          
        }
        else {
            getPage(url);
         }  
       }  
     });
  
     $(".back.button").click(function(){
      var cObject = $(this);
      cObject.parent().parent().parent().removeClass("active");
      setTimeout(function(){
        cObject.parent().parent().parent().not(".notifications").remove();
        $(".checkin").remove();
        $("section.notifications").removeClass("hide");
      }, 1000);
     });     
   });  

}


function checkPageParameters(){
  var page = null;
  var path = null;
  var email_validation = getURLParameter("email_validation");
  var telephone_validation = getURLParameter("telephone_validation");
  var invite_code = getURLParameter("invite_code");
  var unsubscribe = getURLParameter("unsubscribe");

  if (email_validation) {
    codeValidate( email_validation, "/send_validate_email_code");
  }

  if (telephone_validation) {
    codeValidate( telephone_validation, "/send_validate_phone_code");
  }

  try {
    path = location.pathname;
    page = getURLParameter("pagename");
  }
  catch(err) {
    console.log("could not find parameter pagename");   
  } 

   // redirect to notifications
   setTimeout(function(){
     $(".overlay").hide();
     
     if (page === "user_notifications") {
      console.log("user_notifications");
       $("a[href$='user_notifications/']").click();
     }     
     if (invite_code) {
        setCookie("invite_code", invite_code, 365); 
     }
     
     if (unsubscribe) {
        sendUnsubscribe(unsubscribe);
     }
     
   }, 1000);  

   
}


function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}