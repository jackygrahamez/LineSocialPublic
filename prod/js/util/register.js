function registerForm(){$(".register input").focusout(function(){var e=$(this);e.val().length>0&&e.removeClass("invalid")}),$(".register input[name='username']").focusout(function(){var e=$(this).val();e.length>0&&regCheck(e)}),$(".register input[name='email']").focusout(function(){var e=$(this).val();if(e.length>0){regCheckEmail(e)}})}function getCookie(e){for(var t=e+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){var s=i[n].trim();if(0==s.indexOf(t))return s.substring(t.length,s.length)}return""}