function registerForm(){$(".register input").focusout(function(){var e=$(this);e.val().length>0&&e.removeClass("invalid")}),$(".register input[name='username']").focusout(function(){var e=$(this).val();e.length>0&&regCheck(e)}),$(".register input[name='email']").focusout(function(){var e=$(this).val();if(e.length>0){regCheckEmail(e)}})}
/*
//@ sourceMappingURL=register.js.map
*/
