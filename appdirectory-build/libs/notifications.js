
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