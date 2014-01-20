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

}       

     
     $(".login a").click(function(e){
       e.preventDefault();
       var url = $(this).attr("href");
       console.log("url "+url);
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
             console.log("url "+url);
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

 function userRegister(email, password, firstName, lastName, username, telephone) {
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
             telephone: telephone},
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
// }); 