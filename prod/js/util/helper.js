function googleAnalytics(){!function(e,t,i,n,s,a,o){e.GoogleAnalyticsObject=s,e[s]=e[s]||function(){(e[s].q=e[s].q||[]).push(arguments)},e[s].l=1*new Date,a=t.createElement(i),o=t.getElementsByTagName(i)[0],a.async=1,a.src=n,o.parentNode.insertBefore(a,o)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-46446487-2","xxxxx"),ga("send","pageview")}function homeFormat(){if($("body").hasClass("home")){console.log("home"),"undefined"!=$(".cID").attr("value")&&autocheckout();var e=$(".username").attr("value"),t="/"+e+"/user_notifications/";console.log("notification_url "+t),getNotifications(t),checkInviteCode()}$(".login a").click(function(e){e.preventDefault();var t=$(this).attr("href");if(console.log("url "+t),t.indexOf("notifications")>0)$(".notifications").addClass("active");else if($(this).hasClass("facebook"))location.assign(t);else if(t.indexOf("messages")>0){global_cID=$(this).children().children().children("#cID").attr("value"),global_fID=$(this).children().children().children("#fID").attr("value"),global_tID=$(this).children().children().children("#tID").attr("value"),global_toUser=$(this).children().children().children(".name").text();var i=$(this).children().children().children("#tester").attr("value"),n=$(this).children().children().children("#session_id").attr("value");getMessages(global_cID,global_fID,i,n,t)}else if(t.indexOf("user_lines")>0){console.log("user_lines"),$("html, body").animate({scrollTop:top-50},"slow");var s='<div class="loader" style="position: fixed;height: 100%;width: 100%;top: 40px;left: 0px;background: rgba(0,0,0, 0.2);"><div></div></div>';$("body > canvas").length<1&&($("body").append(s),$(".loader > div").canvasLoader(),getLocation(0,t))}else getPage(t)})}function contactFormat(){var e=$(".contact_captcha_shape").attr("value"),t=$(".contact_captcha_name").attr("value"),i=$(".contact_captcha_email").attr("value"),n=$(".contact_captcha_message").attr("value"),s=$(".contact_captcha_error").attr("value"),a=$(".contact_captcha_send_message").attr("value");"mc-invalid"!=s&&(s=""),$("section").hasClass("password_reset")&&$("#captcha").motionCaptcha(e),$(".footer li[name='contact']").click(function(){$("#captcha").remove();var o='<form id="captcha" method="POST" action="/contact"> <input type="text" id="contactName" name="name" placeholder="'+t+'">  <input type="email" id="contactEmail" name="email" placeholder="'+i+'">  <input type="text" id="contactMessage" name="message" placeholder="'+n+'"> <div id="mc">    <canvas id="mc-canvas" class="'+s+'"></canvas></div><input id="submit" type="submit" value="'+a+'"></form>';$(".footer li.contact").append(o),$("#captcha").motionCaptcha(e)})}function teleFormat(){$("input[name='telephone']").intlTelInput()}function themeFormat(){$("menu.themes li").click(function(){$(this).siblings().removeClass("active"),$(this).addClass("active");var e=$(this).attr("rel");setActiveStyleSheet(e)})}function fbHashRemove(){window.location.href.indexOf("#_=_")>0&&(window.location=window.location.href.replace(/#.*/,""))}function termsClick(){$("input[name='terms']").click(function(){$(this).removeClass("invalid"),$("form label").removeClass("invalid")}),$("menu.footer li").click(function(){if(!$(this).hasClass("expanded")){var e=$(this).next();if($(e).hasClass("expanded"))$(this).removeClass("down"),$(e).removeClass("expanded");else{$(".down").removeClass("down"),$(".expanded").removeClass("expanded"),$(this).addClass("down"),$(e).addClass("expanded");var t=$(e).position().top;$("html, body").animate({scrollTop:t-50},"slow")}}})}function formatPage(){$("input, textarea").focus(function(){$(this).css("color","black")}),$(".back.button").click(function(){$(".body").last().removeClass("active"),$(".checkin").remove()}),$(".forgot_password div.back.button, .forgot div.back.button").click(function(){location.assign("/")}),$("html").removeClass("disabled")}function autocheckout(){setInterval(function(){getLocation(1)},6e4)}function getLocation(e,t){lURL=t,$("ul.checkin").canvasLoader(),lineLength=e,navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition,showError):x.innerHTML="Geolocation is not supported by this browser."}function showPosition(e){var t=e.coords.latitude+","+e.coords.longitude;if(global_coords=[e.coords.latitude+","+e.coords.longitude],global_coords_lat=e.coords.latitude,global_coords_lon=e.coords.longitude,parseInt(lineLength)>1){var i=location.pathname+"/venues/";getVenues(i,t),$("#coords").val(e.coords.latitude+", "+e.coords.longitude),$("#line_length").val(lineLength)}else if(1==lineLength){var i=(new Date,location.pathname+"/auto_checkout/");auto_checkout(i,e.coords.latitude,e.coords.longitude)}else getLines(lURL)}function showError(e){switch($("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),e.code){case e.PERMISSION_DENIED:$("header p.invalid").replaceWith("<p class='invalid'>Please enable location services for https://alpha.xxxxx in your browser settings.</p>"),$(".loader").remove(),$("canvas").remove();break;case e.POSITION_UNAVAILABLE:$("header p.invalid").replaceWith("<p class='invalid'>Location information is unavailable.</p>"),$(".loader").remove(),$("canvas").remove();break;case e.TIMEOUT:$("header p.invalid").replaceWith("<p class='invalid'>The request to get user location timed out.</p>"),$(".loader").remove(),$("canvas").remove();break;case e.UNKNOWN_ERROR:$("header p.invalid").replaceWith("<p class='invalid'>An unknown error occurred.</p>"),$(".loader").remove(),$("canvas").remove()}}function getPage(e){$.ajax({url:e,type:"GET",cache:!1,success:function(t){markup=t,$("section.body.right").html(t),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),"#share"===e?($(".body.right.active").prepend("<div class='container hero-unit'><h2>Social Share</h2></div>"),$("html, body").animate({scrollTop:top-50},"slow"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto"),$("section.body.right").html("")})):$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function getNotifications(e){$.ajax({url:e,type:"GET",cache:!1,success:function(e){markup=e,$("body .body").last().after(e),setTimeout(function(){$(".back.button").click(function(){$("section.notifications").removeClass("active")})},1e3)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function ArrNoDupe(e){for(var t={},i=0;i<e.length;i++)t[e[i]]=!0;var n=[];for(var s in t)n.push(s);return n}function getVenues(e,t){var i=[];$(".checkin #wrapper > p").addClass("hide"),$.ajax({url:e,type:"POST",cache:!1,data:{coordinates:t},success:function(e){ajaxData=e,html="";for(var t=0;t<e.length;t++)"undefined"!=typeof e[t].name&&(html+="<li><span>"+e[t].name+"</span></li>",i.push(e[t].name));$("#location").autocomplete({source:i}),$("form").removeClass("hide"),$("canvas").addClass("hide"),$("#checkin").click(function(){var e=$("#location").val(),t=$("#coords").val(),i=$("#line_length").val(),n=$("form.checkin").attr("action");checkIn(e,t,i,global_coords_lat,global_coords_lon,n)}),$("input, textarea").focus(function(){$(this).css("color","black")})},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function updatePassword(e,t,i,n){""==n&&(n=" "),$.ajax({url:i,type:"POST",cache:!1,data:{id:e,password:t,telephone:n},success:function(e){"password updated!"===e&&$(".body .back").click()},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function userRegister(e,t,i,n,s,a,o){var r="/register";$.ajax({url:r,type:"POST",cache:!1,data:{email:e,password:t,firstName:i,lastName:n,username:s,telephone:a,invite_code:o},success:function(e){"Account was created"==e?location.replace(location.origin):$("form > p").first().replaceWith(e)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function regCheck(e){var t="/register_value";$.ajax({url:t,type:"POST",cache:!1,data:{username:e},success:function(e){"username taken"==e?$("input[name='username']").addClass("invalid"):$("input[name='username']").removeClass("invalid")},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function grantPoints(e,t){var i="/grant_points";$.ajax({url:i,type:"POST",cache:!1,data:{cID:e,user_id:t},success:function(){},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function sendPoints(e,t,i){var n="/send_points";$.ajax({url:n,type:"POST",cache:!1,data:{points:i,fID:e,tID:t},success:function(){},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function regCheckEmail(e){var t="/register_email_value";$.ajax({url:t,type:"POST",cache:!1,data:{email:e},success:function(e){"email taken"==e?$("input[name='email']").addClass("invalid"):$("input[name='email']").removeClass("invalid")},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function isValidEmail(e){var t=new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);return t.test(e)}function updateMessages(e,t,i,n,s,a,o,r){$.ajax({url:r,type:"POST",cache:!1,data:{ts:e,cID:t,fID:i,tID:n,user:a,messages:s,tester:o},success:function(){},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function updateNotificationMessages(e,t,i,n,s){$.ajax({url:n,type:"POST",cache:!1,data:{cID:e,fID:t,messages:i,requests:s},success:function(){},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function getMessages(e,t,i,n,s){$.ajax({url:s,type:"POST",cache:!1,data:{cID:e,fID:t,tester:i,session_id:n},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove()})},1e3)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function checkTime(e){return 10>e&&(e="0"+e),e}function checkIn(e,t,i,n,s,a){e.length>0&&t.length>0&&i.length>0&&$.ajax({url:a,type:"POST",cache:!1,data:{location:e,geolocation:t,line_length:i,lat:n,lon:s},success:function(e){markup=e,$("#demo").html(e),global_cID=e,autocheckout(),$(".checkin.active .back").click(),$(".line_pokes > div").remove(),$(".chat_requests > ul > li").remove()},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function auto_checkout(e,t,i){t&&$.ajax({url:e,type:"POST",cache:!1,data:{lat:t,lon:i},success:function(e){if(markup=e,"checkout"===e)for(var t=window.setInterval("",9999),i=1;t>i;i++)window.clearInterval(i)},error:function(){}})}function sendUnsubscribe(e){e&&$.ajax({url:"/unsubscribe",type:"POST",cache:!1,data:{unsubscribe:e},success:function(e){getPage(e)},error:function(){}})}function captchaInviteFriend(e,t,i,n){console.log("points "+e),console.log("url "+t),console.log("email "+i),console.log("name "+n),$.ajax({url:t,type:"POST",cache:!1,data:{_points:e,email:i,name:n},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function captchaPoints(e,t){$.ajax({url:t,type:"POST",cache:!1,data:{_points:e},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function codeValidate(e,t){$.ajax({url:t,type:"POST",cache:!1,data:{code:e},success:function(e){markup=e,$("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$("section.content").css("height","0px"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.content").css("height","auto")})},1e3)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function getLines(e){"undefined"!=typeof global_coords_lat&&"undefined"!=typeof global_coords_lon?setTimeout(function(){$.ajax({url:e,type:"POST",cache:!1,data:{lat:global_coords_lat,lon:global_coords_lon},success:function(e){null!=e?($("section.body.right").html(e),$("section.notifications").hasClass("active")||$("section.notifications").addClass("hide"),setTimeout(function(){$("body > .loader").remove(),$("section.body.right").addClass("active"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove(),$("section.notifications").removeClass("hide")})},1e3)):($("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),$("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>"),$(".loader").remove(),$("canvas").remove())},error:function(e,t,i){console.log("text status "+t+", err "+i),$("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),$("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>"),$(".loader").remove(),$("canvas").remove()},timeout:1e4,async:!1})},100):setTimeout(function(){$.ajax({url:e,type:"POST",cache:!1,data:{lat:"",lon:""},success:function(e){null!=e?($("section.body.right").html(e),setTimeout(function(){$("section.body.right").addClass("active"),$(".back.button").click(function(){$(".body").removeClass("active"),$("section.checkin").remove()})},1e3)):($("body > header p.invalid").length<1&&$("body > header").append("<p class='invalid'></p>"),$(".body > header p.invalid").length<1&&$(".body > header").append("<p class='invalid'></p>"),$("header p.invalid").replaceWith("<p class='invalid'>Network Connection Problem</p>"),$(".loader").remove(),$("canvas").remove())},error:function(e,t,i){console.log("text status "+t+", err "+i)},timeout:1e4,async:!1})},100)}function deviceType(e){var t=navigator.userAgent,i={iphone:t.match(/(iPhone|iPod|iPad)/),windows_phone:t.match(/IEMobile/),android:t.match(/Android/)};i.android?$("html").addClass("android"):i.iphone?($("html").addClass("iphone"),e()):i.blackberry?$("html").addClass("blackberry"):i.windows_phone&&$("html").addClass("IEMobile")}function iosCheckbox(){$(".on_off :checkbox").iphoneStyle(),$(".disabled :checkbox").iphoneStyle(),$(".css_sized_container :checkbox").iphoneStyle({resizeContainer:!1,resizeHandle:!1}),$(".long_tiny :checkbox").iphoneStyle({checkedLabel:"Very Long Text",uncheckedLabel:"Tiny"});$(".onchange :checkbox").iphoneStyle({onChange:function(e,t){$("span#status").html(t.toString())}})}function getURLParameter(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}function checkPageParameters(){var e=null,t=null,i=getURLParameter("email_validation"),n=getURLParameter("telephone_validation");i&&codeValidate(i,"/send_validate_email_code"),n&&codeValidate(n,"/send_validate_phone_code");try{t=location.pathname,e=getURLParameter("pagename")}catch(s){console.log("could not find parameter pagename")}setTimeout(function(){$(".overlay").hide(),"user_notifications"===e&&(console.log("user_notifications"),$("a[href$='user_notifications/']").click())},1e3)}function checkInviteCode(){var e=getCookie("invite_code"),t=$("input[name='invite_code']").attr("value"),i=$("input[name='username']").attr("value");void 0===t&&e&&fbInviteCode(i,e)}function fbInviteCode(e,t){var i="/"+e+"/fb_invite_code/";$.ajax({url:i,type:"POST",cache:!1,data:{invite_code:t},success:function(e){console.log("data invite_code "+e)},error:function(e,t,i){console.log("text status "+t+", err "+i)}})}function notificationsModule(){var e=$(".message_from").attr("value");global_tID="";var t=[],i=io.connect(location.origin),n=($(".field.notfications"),$(".send.notifications"),$(".content.notifications"),$(".send.notifications")),s=!1;$(".notifications.controls .cID").val(global_cID),$(".notifications.controls .tID").val(global_tID),global_cID=$(".notifications.controls .cID").val(),global_fID=$(".notifications.controls .fID").val();var a=$(".chat_requests ul li").length;if(parseInt(a)>0&&$(".line_pokes div").text(a),$(".notifications.content div").length>0&&$(".chat_requests > ul > li").length<1){var o=[];$(".notifications.content div").each(function(){$(this).attr("fid")!=$(".notifications.fid").attr("value")&&$(this).attr("name")!=$(".name.notifications").attr("value")&&o.push($(this).attr("name")+"_"+$(this).attr("fid"))});var r=ArrNoDupe(o),l="";if(r.length>0){$(".line_pokes div").replaceWith("<div>"+r.length+"</div>");for(var c=0;c<r.length;c++){var u=r[c].split("_").pop();r[c].split("_").pop(),l+='<li ufid="'+u+'">'+e+" "+r[c].split("_")[0]+"</li>"}$(".chat_requests ul").html(l)}else $(".line_pokes div").addClass("hide")}i.on("message",function(e){if(e.message){t.push(e);var a=$(".content.notifications").html(),o="",r=[],l="bubbledLeft";global_cID=$(".notifications.controls .cID").attr("value"),global_fID=$(".notifications.controls .fID").attr("value"),global_tID=$(".notifications.controls .tID").attr("value"),i.emit("newUser",global_fID);for(var c=0;c<t.length;c++)if($(".notifications.controls .cID").attr("value")==t[c].cID&&"undefined"!=typeof t[c].username){if($(".content.notifications div").each(function(){$(this).attr("ts")==t[c].ts&&(s=!0)}),$(".chat_requests ul li").each(function(){$(this).attr("ufid")==t[c].ts&&(s=!0)}),!s){t[c].fID!=$(".notifications.controls .fID").attr("value")&&r.push(t[c].username+"_"+t[c].fID),t[c].fID===$(".fID.notifications").attr("value")&&(l="bubbledRight");var u=new Date,h=u.getHours(),d="am";h>12&&(h-=12,d="pm");var p=u.getMinutes();p=checkTime(p);var f=" "+h+":"+p+" "+d;a+='<div ts="'+t[c].ts+'" class="'+l+'" name="'+t[c].username+'" cID="'+t[c].cID+'" fID="'+t[c].fID+'" tID="'+t[c].tID+'"><span><b>'+(t[c].username?t[c].username:"Server")+": </b>",a+=t[c].message+" <time>"+f+"</time></span></div>"}s=!1}var g=ArrNoDupe(r);a.length>0&&($(".content.notifications").html(a),$(".content.notifications").stop().animate({scrollTop:$(".content.notifications")[0].scrollHeight},800)),g.length>0?$(".line_pokes div").replaceWith("<div>"+g.length+"</div>"):$(".line_pokes div").addClass("hide"),global_tID&&$(".accordion .content.notifications p").each(function(){$(this).attr("fid")==global_tID||$(this).attr("tid")==global_tID?$(this).show():$(this).hide()});for(var o=$(".chat_requests ul").html(),c=0;c<g.length;c++){var m=g[c].split("_").pop();g[c].split("_").pop(),m!=$(".notifications.fid").attr("value")&&$(".chat_requests ul li[ufid='"+m+"']").length<1&&(o+='<li ufid="'+m+'">Message from '+g[c].split("_")[0]+"</li>",$(".chat_requests ul").append(o),$(".chat_requests ul > li").unbind("click"),$(".chat_requests ul > li").click(function(){var e=$(this).attr("ufid");global_tID=e,$(".notifications.controls .tID").attr("value",global_tID),$(".accordion").toggleClass("off"),$(".accordion div").hide(),$(".accordion ."+e).show(),$(".content.notifications").stop().animate({scrollTop:$(".content.notifications")[0].scrollHeight},800),$(".accordion .content.notifications div").each(function(){$(this).attr("fid")==global_tID||$(this).attr("tid")==global_tID?$(this).show():$(this).hide()});$(".content").html(),$(".chat_requests > ul ").html(),"/"+n.value+"/update_notification_messages/";global_fID=$(".message.controls .fID").attr("value"),global_cID=$(".message.controls .cID").attr("value")}))}o.length>0&&$(".chat_requests ul").html(o),$(".chat_requests ul li").click(function(){var e=$(this).attr("ufid");global_tID=e,$(".notifications.controls .tID").attr("value",global_tID),$(".accordion").toggleClass("off"),$(".accordion ."+e).show(),$(".content.notifications").stop().animate({scrollTop:$(".content.notifications")[0].scrollHeight},800),$(".accordion .content.notifications div").each(function(){$(this).attr("fid")==global_tID||$(this).attr("tid")==global_tID?$(this).show():$(this).hide()})})}else console.log("There is a problem:",e)}),$(".send.notifications").click(function(){var e=new Date;if(""==n.value)alert("Please type your name!");else{var e=new Date,t=e.getHours(),s="am";t>12&&(t-=12,s="pm");var a=e.getMinutes();a=checkTime(a);var o=$(".field.notifications").val(),r=e.getTime(),l=$(".name.notifications").val();html="";var c=$(".notifications.controls .tID").attr("value"),u=$(".notifications.controls .cID").attr("value"),h=$(".notifications.controls .fID").attr("value");i.emit("message",{ts:r,cID:u,fID:h,tID:c,message:o,username:l});var d="/"+n.value+"/update_messages/";updateMessages(r,u,h,c,o,l,d),$(".field.notifications").val(""),o=""}})}function registerForm(){$(".register input").focusout(function(){var e=$(this);e.val().length>0&&e.removeClass("invalid")}),$(".register input[name='username']").focusout(function(){var e=$(this).val();e.length>0&&regCheck(e)}),$(".register input[name='email']").focusout(function(){var e=$(this).val();if(e.length>0){regCheckEmail(e)}})}function getCookie(e){for(var t=e+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){var s=i[n].trim();if(0==s.indexOf(t))return s.substring(t.length,s.length)}return""}function redirectDomain(){location.href.indexOf("alpha.")<0&&location.href.indexOf("localhost")<0&&(page&&path?location.replace("https://alpha.xxxxx/"+location.pathname+"?"+page):location.replace("https://alpha.xxxxx"))}function PageLoader(){addthis.init();var e=getURLParameter("invalid");$(".overlay > div").canvasLoader(),setTimeout(function(){$(".overlay").remove(),setTimeout(function(){$(".overlay > canvas").remove(),e&&($("#inputPassword").after("<label class='invalid'>Invalid Login</label>"),$("input").addClass("invalid"))},1e3)},3e3)}function subPageLoad(){document.getElementById("demo");$(document).ready(function(){setTimeout(function(){$("menu.themes li").click(function(){$(this).siblings().removeClass("active"),$(this).addClass("active");var e=$(this).attr("rel");setActiveStyleSheet(e)}),$("menu.themes > li").first().addClass("active")},1e3),$("link").each(function(){if(!$(this).attr("disabled")&&void 0!=$(this).attr("title")){var e=$(this).attr("title");$(".themes li[rel='"+e+"']").click()}}),$("input[type='text'], textarea").focus(function(){$(this).css("color","black")}),$("input, textarea").focus(function(){$(this).css("color","black")}),$("a").click(function(e){e.preventDefault();var t=$(this).attr("href");if(t.indexOf("notifications")>0)$(".notifications").addClass("active");else if(t.indexOf("messages")>0){global_cID=$(this).children().children().children("#cID").attr("value"),global_fID=$(this).children().children().children("#fID").attr("value"),global_tID=$(this).children().children().children("#tID").attr("value"),global_toUser=$(this).children().children().children(".name").text();var i=$(this).children().children().children("#tester").attr("value"),n=$(this).children().children().children("#session_id").attr("value");getMessages(global_cID,global_fID,i,n,t)}else if($(this).hasClass("logout"))location.href="/";else if(t.indexOf("user_lines")>0){console.log("user_lines"),$("html, body").animate({scrollTop:top-50},"slow");var s='<div class="loader" style="position: fixed;height: 100%;width: 100%;top: 40px;left: 0px;background: rgba(0,0,0, 0.2);"><div></div></div>';$("body > canvas").length<1&&($("body").append(s),$(".loader > div").canvasLoader(),getLocation(0,t))}else getPage(t)}),$(".back.button").click(function(){var e=$(this);e.parent().parent().parent().removeClass("active"),setTimeout(function(){e.parent().parent().parent().not(".notifications").remove(),$(".checkin").remove(),$("section.notifications").removeClass("hide")},1e3)})})}function checkPageParameters(){var e=null,t=null,i=getURLParameter("email_validation"),n=getURLParameter("telephone_validation"),s=getURLParameter("invite_code"),a=getURLParameter("unsubscribe");i&&codeValidate(i,"/send_validate_email_code"),n&&codeValidate(n,"/send_validate_phone_code");try{t=location.pathname,e=getURLParameter("pagename")}catch(o){console.log("could not find parameter pagename")}setTimeout(function(){$(".overlay").hide(),"user_notifications"===e&&(console.log("user_notifications"),$("a[href$='user_notifications/']").click()),s&&setCookie("invite_code",s,365),a&&sendUnsubscribe(a)},1e3)}function setCookie(e,t,i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3);var s="expires="+n.toGMTString();document.cookie=e+"="+t+"; "+s}function messageInitialize(){var e=$(".points_to").attr("value"),t=$(".send_button_text").attr("value");global_toUser&&($(".wrapper > h2").removeClass("hide"),$(".wrapper > h2").append(global_toUser));{var i=[],n=io.connect(location.origin),s=(document.getElementById("field"),$(".content.messages"),document.getElementById("name"),!1);$(".message.controls .cID").val(),$(".field.message").val()}$(".message.controls .cID").attr("value",global_cID),$(".message.controls .tID").attr("value",global_tID),global_fID=$(".message.controls .fID").val(),$(".content.messages").stop().animate({scrollTop:$(".content.messages")[0].scrollHeight},800),$("html").hasClass("iphone")?($("#amount").text($("#slider-fill").val()),$("#slider-fill").change(function(){$("#amount").text($("#slider-fill").val())})):$("#slider").slider({value:5,min:0,max:10,step:1,slide:function(e,t){$("#amount").text(t.value)}}),$(".send_points").click(function(){var i=new Date,s=i.getHours(),a="am";s>12&&(s-=12,a="pm");var o=i.getMinutes();o=checkTime(o);var r=" "+s+":"+o+" "+a,l=$(".message.controls .fID").val(),c=$(".message.controls .tID").val(),u=$("#amount").text(),h=parseInt($(".balance_value").text())-u;console.log("points "+u);var d=$(".name.message").val(),p=d+" sent "+u,f=$(".content.messages").html();f+='<div class="bubbledLeft"><span><b> System: </b>',f+=p+" <time>"+r+"</time></span></div>";var g=t+" "+u+" "+e+" "+global_toUser+"?";confirm(g)&&($(".content.messages").html(f),$(".balance_value").text(h),sendPoints(l,c,u),n.emit("send",{message:d+" sent "+u}))}),setTimeout(function(){n.on("message",function(e){console.log("data "+JSON.stringify(e));var t=$(".tester").val();if(e.message){i.push(e);var n=$(".content.messages").html(),a=new Date,o=a.getHours(),r="am";o>12&&(o-=12,r="pm");var l=a.getMinutes();l=checkTime(l);{var c=" "+o+":"+l+" "+r;a.getTime()}global_fID=$(".message.controls .fID").attr("value"),$(".content.messages").stop().animate({scrollTop:$(".content.messages")[0].scrollHeight},800);for(var u=0;u<i.length;u++){var h="bubbledLeft";s=!1,i[u].cID!=$(".message.controls .cID").attr("value")||i[u].fID!=$(".message.controls .fID").attr("value")&&i[u].tID!=$(".message.controls .fID").attr("value")||($(".content.messages > div").each(function(){$(this).attr("ts")==i[u].ts&&(s=!0)}),s||(i[u].fID===$(".message.fID").attr("value")&&(h="bubbledRight"),n+='<div ts="'+i[u].ts+'" class="'+h+'" name="'+i[u].username+'" cID="'+i[u].cID+'" fID="'+i[u].fID+'" tID="'+i[u].tID+'"><span><b>'+(i[u].username?i[u].username:"Server")+": </b>",n+=i[u].message+" <time>"+c+"</time></span></div>"),s=!1)}$(".content.messages").html(n),"undefined"!=t&&(n=$(".content.messages").html(),setTimeout(function(){if($(".content.messages div").length<3)n+='<div class="bubbledLeft"><span><b> System: </b>',n+="User Left! Sorry <time>"+c+"</time></span></div>",$(".content.messages").html(n);else if($(".content.messages div").length>2&&$(".content.messages div").length<5){n+='<div class="bubbledLeft"><span><b> System: </b>',n+="Sorry I will give you some points!<time>"+c+"</time></span></div>",$(".content.messages").html(n);var e=$(".message.controls .cID").val(),t=$(".message.controls .fID").val();grantPoints(e,t)}},1e3))}else console.log("There is a problem:",e)})},1e3),$(".send.message").click(function(){{var e=$(".tester").val(),t=$(".name.message").val(),i=new Date;$(".session_id").val()}if(""==t)alert("Please type your name!");else{var i=new Date,s=i.getHours(),a="am";s>12&&(s-=12,a="pm");var o=i.getMinutes();o=checkTime(o);var r=i.getTime(),l=$(".field.message").val(),c=$(".message.controls .cID").val(),u=$(".message.controls .tID").val(),h=$(".message.controls .fID").val();$(".field.message").val(""),global_cID=$(".message.controls .cID").attr("value");var d={ts:r,cID:c,fID:h,tID:u,message:l,username:t,tester:e};console.log("newMessage "+JSON.stringify(d)),n.emit("message",{message:"test"}),n.emit("message",{ts:r,cID:c,fID:h,tID:u,message:l,username:t,tester:e});var p="/"+t+"/update_messages/";updateMessages(r,c,h,u,l,t,e,p),l=""}}),sendSystemMessage()}function sendSystemMessage(){{var e=io.connect(location.origin),t=$(".tester").val(),i="system",n=new Date;$(".session_id").val()}if(""==i)alert("Please type your name!");else{var n=new Date,s=n.getHours(),a="am";s>12&&(s-=12,a="pm");var o=n.getMinutes();o=checkTime(o);var r=n.getTime(),l="You have just poked "+global_toUser,c=$(".message.controls .cID").val(),u=$(".message.controls .tID").val(),h=$(".message.controls .fID").val();$(".field.message").val(""),global_cID=$(".message.controls .cID").attr("value"),e.emit("message",{ts:r,cID:c,fID:u,tID:h,message:l,username:i,tester:t});var d="/"+i+"/update_messages/";updateMessages(r,c,u,h,l,i,t,d),l=""}}