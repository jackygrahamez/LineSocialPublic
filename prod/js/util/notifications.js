function notificationsModule(){var e=$(".message_from").attr("value");global_tID="";var t=[],i=io.connect(location.origin),n=($(".field.notfications"),$(".send.notifications"),$(".content.notifications"),$(".send.notifications")),s=!1;$(".notifications.controls .cID").val(global_cID),$(".notifications.controls .tID").val(global_tID),global_cID=$(".notifications.controls .cID").val(),global_fID=$(".notifications.controls .fID").val();var r=$(".chat_requests ul li").length;if(parseInt(r)>0&&$(".line_pokes div").text(r),$(".notifications.content div").length>0&&$(".chat_requests > ul > li").length<1){var a=[];$(".notifications.content div").each(function(){$(this).attr("fid")!=$(".notifications.fid").attr("value")&&$(this).attr("name")!=$(".name.notifications").attr("value")&&a.push($(this).attr("name")+"_"+$(this).attr("fid"))});var o=ArrNoDupe(a),l="";if(o.length>0){$(".line_pokes div").replaceWith("<div>"+o.length+"</div>");for(var c=0;c<o.length;c++){var u=o[c].split("_").pop();o[c].split("_").pop(),l+='<li ufid="'+u+'">'+e+" "+o[c].split("_")[0]+"</li>"}$(".chat_requests ul").html(l)}else $(".line_pokes div").addClass("hide")}i.on("message",function(e){if(e.message){t.push(e);var r=$(".content.notifications").html(),a="",o=[],l="bubbledLeft";global_cID=$(".notifications.controls .cID").attr("value"),global_fID=$(".notifications.controls .fID").attr("value"),global_tID=$(".notifications.controls .tID").attr("value"),i.emit("newUser",global_fID);for(var c=0;c<t.length;c++)if($(".notifications.controls .cID").attr("value")==t[c].cID&&"undefined"!=typeof t[c].username){if($(".content.notifications div").each(function(){$(this).attr("ts")==t[c].ts&&(s=!0)}),$(".chat_requests ul li").each(function(){$(this).attr("ufid")==t[c].ts&&(s=!0)}),!s){t[c].fID!=$(".notifications.controls .fID").attr("value")&&o.push(t[c].username+"_"+t[c].fID),t[c].fID===$(".fID.notifications").attr("value")&&(l="bubbledRight");var u=new Date,h=u.getHours(),d="am";h>12&&(h-=12,d="pm");var p=u.getMinutes();p=checkTime(p);var f=" "+h+":"+p+" "+d;r+='<div ts="'+t[c].ts+'" class="'+l+'" name="'+t[c].username+'" cID="'+t[c].cID+'" fID="'+t[c].fID+'" tID="'+t[c].tID+'"><span><b>'+(t[c].username?t[c].username:"Server")+": </b>",r+=t[c].message+" <time>"+f+"</time></span></div>"}s=!1}var g=ArrNoDupe(o);r.length>0&&($(".content.notifications").html(r),$(".content.notifications").stop().animate({scrollTop:$(".content.notifications")[0].scrollHeight},800)),g.length>0?$(".line_pokes div").replaceWith("<div>"+g.length+"</div>"):$(".line_pokes div").addClass("hide"),global_tID&&$(".accordion .content.notifications p").each(function(){$(this).attr("fid")==global_tID||$(this).attr("tid")==global_tID?$(this).show():$(this).hide()});for(var a=$(".chat_requests ul").html(),c=0;c<g.length;c++){var m=g[c].split("_").pop();g[c].split("_").pop(),m!=$(".notifications.fid").attr("value")&&$(".chat_requests ul li[ufid='"+m+"']").length<1&&(a+='<li ufid="'+m+'">Message from '+g[c].split("_")[0]+"</li>",$(".chat_requests ul").append(a),$(".chat_requests ul > li").unbind("click"),$(".chat_requests ul > li").click(function(){var e=$(this).attr("ufid");global_tID=e,$(".notifications.controls .tID").attr("value",global_tID),$(".accordion").toggleClass("off"),$(".accordion div").hide(),$(".accordion ."+e).show(),$(".content.notifications").stop().animate({scrollTop:$(".content.notifications")[0].scrollHeight},800),$(".accordion .content.notifications div").each(function(){$(this).attr("fid")==global_tID||$(this).attr("tid")==global_tID?$(this).show():$(this).hide()});$(".content").html(),$(".chat_requests > ul ").html(),"/"+n.value+"/update_notification_messages/";global_fID=$(".message.controls .fID").attr("value"),global_cID=$(".message.controls .cID").attr("value")}))}a.length>0&&$(".chat_requests ul").html(a),$(".chat_requests ul li").click(function(){var e=$(this).attr("ufid");global_tID=e,$(".notifications.controls .tID").attr("value",global_tID),$(".accordion").toggleClass("off"),$(".accordion ."+e).show(),$(".content.notifications").stop().animate({scrollTop:$(".content.notifications")[0].scrollHeight},800),$(".accordion .content.notifications div").each(function(){$(this).attr("fid")==global_tID||$(this).attr("tid")==global_tID?$(this).show():$(this).hide()})})}else console.log("There is a problem:",e)}),$(".send.notifications").click(function(){var e=new Date;if(""==n.value)alert("Please type your name!");else{var e=new Date,t=e.getHours(),s="am";t>12&&(t-=12,s="pm");var r=e.getMinutes();r=checkTime(r);var a=$(".field.notifications").val(),o=e.getTime(),l=$(".name.notifications").val();html="";var c=$(".notifications.controls .tID").attr("value"),u=$(".notifications.controls .cID").attr("value"),h=$(".notifications.controls .fID").attr("value");i.emit("send",{ts:o,cID:u,fID:h,tID:c,message:a,username:l});var d="/"+n.value+"/update_messages/";updateMessages(o,u,h,c,a,l,d),$(".field.notifications").val(""),a=""}})}