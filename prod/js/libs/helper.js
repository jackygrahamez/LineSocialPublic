function googleAnalytics(){!function(e,t,n,i,a,r,o){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,r=t.createElement(n),o=t.getElementsByTagName(n)[0],r.async=1,r.src=i,o.parentNode.insertBefore(r,o)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-46446487-2","xxxxx"),ga("send","pageview")}function homeFormat(){if($("body").hasClass("home")){console.log("home"),"undefined"!=$(".cID").attr("value")&&autocheckout();var e=$(".username").attr("value"),t="/"+e+"/user_notifications/";console.log("notification_url "+t),getNotifications(t)}$(".login a").click(function(e){e.preventDefault();var t=$(this).attr("href");if(console.log("url "+t),t.indexOf("notifications")>0)$(".notifications").addClass("active");else if($(this).hasClass("facebook"))location.assign(t);else if(t.indexOf("messages")>0){global_cID=$(this).children().children().children("#cID").attr("value"),global_fID=$(this).children().children().children("#fID").attr("value"),global_tID=$(this).children().children().children("#tID").attr("value"),global_toUser=$(this).children().children().children(".name").text();var n=$(this).children().children().children("#tester").attr("value"),i=$(this).children().children().children("#session_id").attr("value");getMessages(global_cID,global_fID,n,i,t)}else if(t.indexOf("user_lines")>0){console.log("user_lines"),$("html, body").animate({scrollTop:top-50},"slow");var a='<div class="loader" style="position: fixed;height: 100%;width: 100%;top: 40px;left: 0px;background: rgba(0,0,0, 0.2);"><div></div></div>';$("body > canvas").length<1&&($("body").append(a),$(".loader > div").canvasLoader(),console.log("url "+t),getLocation(0,t))}else getPage(t)})}function contactFormat(){var e=$(".contact_captcha_shape").attr("value"),t=$(".contact_captcha_name").attr("value"),n=$(".contact_captcha_email").attr("value"),i=$(".contact_captcha_message").attr("value"),a=$(".contact_captcha_error").attr("value"),r=$(".contact_captcha_send_message").attr("value");"mc-invalid"!=a&&(a=""),$("section").hasClass("password_reset")&&$("#captcha").motionCaptcha(e),$(".footer li[name='contact']").click(function(){$("#captcha").remove();var o='<form id="captcha" method="POST" action="/contact"> <input type="text" id="contactName" name="name" placeholder="'+t+'">  <input type="email" id="contactEmail" name="email" placeholder="'+n+'">  <input type="text" id="contactMessage" name="message" placeholder="'+i+'"> <div id="mc">    <canvas id="mc-canvas" class="'+a+'"></canvas></div><input id="submit" type="submit" value="'+r+'"></form>';$(".footer li.contact").append(o),$("#captcha").motionCaptcha(e)})}function teleFormat(){$("input[name='telephone']").intlTelInput()}function themeFormat(){$("menu.themes li").click(function(){$(this).siblings().removeClass("active"),$(this).addClass("active");var e=$(this).attr("rel");setActiveStyleSheet(e)})}function fbHashRemove(){window.location.href.indexOf("#_=_")>0&&(window.location=window.location.href.replace(/#.*/,""))}function termsClick(){$("input[name='terms']").click(function(){$(this).removeClass("invalid"),$("form label").removeClass("invalid")}),$("menu.footer li").click(function(){if(!$(this).hasClass("expanded")){var e=$(this).next();if($(e).hasClass("expanded"))$(this).removeClass("down"),$(e).removeClass("expanded");else{$(".down").removeClass("down"),$(".expanded").removeClass("expanded"),$(this).addClass("down"),$(e).addClass("expanded");var t=$(e).position().top;$("html, body").animate({scrollTop:t-50},"slow")}}})}function formatPage(){$("input, textarea").focus(function(){$(this).css("color","black")}),$(".back.button").click(function(){$(".body").last().removeClass("active"),$(".checkin").remove()}),$(".forgot_password div.back.button, .forgot div.back.button").click(function(){location.assign("/")}),$("html").removeClass("disabled")}function autocheckout(){setInterval(function(){getLocation(1)},6e4)}function getLocation(e,t){lURL=t,$("ul.checkin").canvasLoader(),lineLength=e,navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition,showError):x.innerHTML="Geolocation is not supported by this browser."}function showPosition(e){var t=e.coords.latitude+","+e.coords.longitude;if(global_coords=[e.coords.latitude+","+e.coords.longitude],global_coords_lat=e.coords.latitude,global_coords_lon=e.coords.longitude,parseInt(lineLength)>1){var n=location.pathname+"/venues/";getVenues(n,t),$("#coords").val(e.coords.latitude+", "+e.coords.longitude),$("#line_length").val(lineLength)}else if(1==lineLength){var n=(new Date,location.pathname+"/auto_checkout/");auto_checkout(n,e.coords.latitude,e.coords.longitude)}else getLines(lURL)}function showError(e){switch($("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),e.code){case e.PERMISSION_DENIED:$("header p.invalid").replaceWith("<p class='invalid'>Please enable location services for https://alpha.xxxxx in your browser settings.</p>"),$(".loader").remove(),$("canvas").remove();break;case e.POSITION_UNAVAILABLE:$("header p.invalid").replaceWith("<p class='invalid'>Location information is unavailable.</p>"),$(".loader").remove(),$("canvas").remove();break;case e.TIMEOUT:$("header p.invalid").replaceWith("<p class='invalid'>The request to get user location timed out.</p>"),$(".loader").remove(),$("canvas").remove();break;case e.UNKNOWN_ERROR:$("header p.invalid").replaceWith("<p class='invalid'>An unknown error occurred.</p>"),$(".loader").remove(),$("canvas").remove()}}function getPage(e){$.ajax({url:e,type:"GET",cache:!1,success:function(t){markup=t,$("section.body.right").html(t),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),"#share"===e?($(".body.right.active").prepend("<div class='container hero-unit'><h2>Social Share</h2></div>"),$("html, body").animate({scrollTop:top-50},"slow"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto"),$("section.body.right").html("")})):$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function getNotifications(e){$.ajax({url:e,type:"GET",cache:!1,success:function(e){markup=e,$("body .body").last().after(e),setTimeout(function(){$(".back.button").click(function(){$("section.notifications").removeClass("active")})},1e3)},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function ArrNoDupe(e){for(var t={},n=0;n<e.length;n++)t[e[n]]=!0;var i=[];for(var a in t)i.push(a);return i}function getVenues(e,t){var n=[];$(".checkin #wrapper > p").addClass("hide"),$.ajax({url:e,type:"POST",cache:!1,data:{coordinates:t},success:function(e){ajaxData=e,html="";for(var t=0;t<e.length;t++)"undefined"!=typeof e[t].name&&(html+="<li><span>"+e[t].name+"</span></li>",n.push(e[t].name));$("#location").autocomplete({source:n}),$("form").removeClass("hide"),$("canvas").addClass("hide"),$("#checkin").click(function(){var e=$("#location").val(),t=$("#coords").val(),n=$("#line_length").val(),i=$("form.checkin").attr("action");checkIn(e,t,n,global_coords_lat,global_coords_lon,i)}),$("input, textarea").focus(function(){$(this).css("color","black")})},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function updatePassword(e,t,n,i){""==i&&(i=" "),$.ajax({url:n,type:"POST",cache:!1,data:{id:e,password:t,telephone:i},success:function(e){"password updated!"===e&&$(".body .back").click()},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function userRegister(e,t,n,i,a,r){var o="/register";$.ajax({url:o,type:"POST",cache:!1,data:{email:e,password:t,firstName:n,lastName:i,username:a,telephone:r},success:function(e){"Account was created"==e?location.replace(location.origin):$("form > p").first().replaceWith(e)},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function regCheck(e){var t="/register_value";$.ajax({url:t,type:"POST",cache:!1,data:{username:e},success:function(e){"username taken"==e?$("input[name='username']").addClass("invalid"):$("input[name='username']").removeClass("invalid")},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function grantPoints(e,t){var n="/grant_points";$.ajax({url:n,type:"POST",cache:!1,data:{cID:e,user_id:t},success:function(){},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function sendPoints(e,t,n){var i="/send_points";$.ajax({url:i,type:"POST",cache:!1,data:{points:n,fID:e,tID:t},success:function(){},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function regCheckEmail(e){var t="/register_email_value";$.ajax({url:t,type:"POST",cache:!1,data:{email:e},success:function(e){"email taken"==e?$("input[name='email']").addClass("invalid"):$("input[name='email']").removeClass("invalid")},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function isValidEmail(e){var t=new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);return t.test(e)}function updateMessages(e,t,n,i,a,r,o,s){$.ajax({url:s,type:"POST",cache:!1,data:{ts:e,cID:t,fID:n,tID:i,user:r,messages:a,tester:o},success:function(){},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function updateNotificationMessages(e,t,n,i,a){$.ajax({url:i,type:"POST",cache:!1,data:{cID:e,fID:t,messages:n,requests:a},success:function(){},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function getMessages(e,t,n,i,a){$.ajax({url:a,type:"POST",cache:!1,data:{cID:e,fID:t,tester:n,session_id:i},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove()})},1e3)},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function checkTime(e){return 10>e&&(e="0"+e),e}function checkIn(e,t,n,i,a,r){e.length>0&&t.length>0&&n.length>0&&$.ajax({url:r,type:"POST",cache:!1,data:{location:e,geolocation:t,line_length:n,lat:i,lon:a},success:function(e){markup=e,$("#demo").html(e),global_cID=e,autocheckout(),$(".checkin.active .back").click(),$(".line_pokes > div").remove(),$(".chat_requests > ul > li").remove()},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function auto_checkout(e,t,n){t&&$.ajax({url:e,type:"POST",cache:!1,data:{lat:t,lon:n},success:function(e){if(markup=e,"checkout"===e)for(var t=window.setInterval("",9999),n=1;t>n;n++)window.clearInterval(n)},error:function(){}})}function captchaPoints(e,t){$.ajax({url:t,type:"POST",cache:!1,data:{_points:e},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function codeValidate(e,t){$.ajax({url:t,type:"POST",cache:!1,data:{code:e},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,n){console.log("text status "+t+", err "+n)}})}function getLines(e){"undefined"!=typeof global_coords_lat&&"undefined"!=typeof global_coords_lon?setTimeout(function(){$.ajax({url:e,type:"POST",cache:!1,data:{lat:global_coords_lat,lon:global_coords_lon},success:function(e){null!=e?($("section.body.right").html(e),$("section.notifications").hasClass("active")||$("section.notifications").addClass("hide"),setTimeout(function(){$("body > .loader").remove(),$("section.body.right").addClass("active"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.notifications").removeClass("hide")})},1e3)):($("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),$("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>"),$(".loader").remove(),$("canvas").remove())},error:function(e,t,n){console.log("text status "+t+", err "+n),$("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),$("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>"),$(".loader").remove(),$("canvas").remove()},timeout:1e4,async:!1})},100):setTimeout(function(){$.ajax({url:e,type:"POST",cache:!1,data:{lat:"",lon:""},success:function(e){null!=e?($("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove()})},1e3)):($("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),$("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>"),$(".loader").remove(),$("canvas").remove())},error:function(e,t,n){console.log("text status "+t+", err "+n)},timeout:1e4,async:!1})},100)}function deviceType(e){var t=navigator.userAgent,n={iphone:t.match(/(iPhone|iPod|iPad)/),windows_phone:t.match(/IEMobile/),android:t.match(/Android/)};n.android?$("html").addClass("android"):n.iphone?($("html").addClass("iphone"),e()):n.blackberry?$("html").addClass("blackberry"):n.windows_phone&&$("html").addClass("IEMobile")}function iosCheckbox(){$(".on_off :checkbox").iphoneStyle(),$(".disabled :checkbox").iphoneStyle(),$(".css_sized_container :checkbox").iphoneStyle({resizeContainer:!1,resizeHandle:!1}),$(".long_tiny :checkbox").iphoneStyle({checkedLabel:"Very Long Text",uncheckedLabel:"Tiny"});$(".onchange :checkbox").iphoneStyle({onChange:function(e,t){$("span#status").html(t.toString())}})}function getURLParameter(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}function checkPageParameters(){var e=null,t=null,n=getURLParameter("email_validation"),i=getURLParameter("telephone_validation");n&&codeValidate(n,"/send_validate_email_code"),i&&codeValidate(i,"/send_validate_phone_code");try{t=location.pathname,e=getURLParameter("pagename")}catch(a){console.log("could not find parameter pagename")}setTimeout(function(){$(".overlay").hide(),"user_notifications"===e&&(console.log("user_notifications"),$("a[href$='user_notifications/']").click())},1e3)}