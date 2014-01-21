function PageLoader(){var e=getURLParameter("invalid");$(".overlay > div").canvasLoader(),setTimeout(function(){$(".overlay").remove(),setTimeout(function(){$(".overlay > canvas").remove(),e&&($("#inputPassword").after("<label class='invalid'>Invalid Login</label>"),$("input").addClass("invalid"))},1e3)},3e3)}
/*
//@ sourceMappingURL=canvasLoader.js.map
*/
