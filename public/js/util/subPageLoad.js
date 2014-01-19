function subPageLoad() {
var x=document.getElementById("demo");
	$(document).ready( function(){
	   //$("body").height($(document).height());
	   //Themes
	   /*
	   $("menu.themes li").click(function(){
		   var themeColor = $(this).attr("rel");
		   setActiveStyleSheet(themeColor);
	   });	
	   */
	   //Themes
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