function checkPageParameters(){var e=null,t=null,i=getURLParameter("email_validation"),n=getURLParameter("telephone_validation");i&&codeValidate(i,"/send_validate_email_code"),n&&codeValidate(n,"/send_validate_phone_code");try{t=location.pathname,e=getURLParameter("pagename")}catch(s){console.log("could not find parameter pagename")}setTimeout(function(){$(".overlay").hide(),"user_notifications"===e&&(console.log("user_notifications"),$("a[href$='user_notifications/']").click())},1e3)}
/*
//@ sourceMappingURL=pageParameterCheck.js.map
*/