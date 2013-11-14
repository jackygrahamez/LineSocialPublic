  //checkin
  var x=document.getElementById("demo");
  var lineLength=0; 
(function($, window, undefined) {
 window.Chat = {
    socket : null,

    initialize : function(socketURL) {
      this.socket = io.connect(socketURL);

      //Send message on button click or enter
      $('#send').click(function() {
        Chat.send();
      });

      $('#message').keyup(function(evt) {
        if ((evt.keyCode || evt.which) == 13) {
          Chat.send();
          return false;
        }
      });

      //Process any incoming messages
      this.socket.on('new', this.add);
    },

    //Adds a new message to the chat.
    add : function(data) {
      var name = data.name || 'anonymous';
      var msg = $('<div class="msg"></div>')
        .append('<span class="name">' + name + '</span>: ')
        .append('<span class="text">' + data.msg + '</span>');

      $('#messages')
        .append(msg)
        .animate({scrollTop: $('#messages').prop('scrollHeight')}, 0);
    },

    //Sends a message to the server,
    //then clears it from the textarea
    send : function() {
      this.socket.emit('msg', {
        name: $('#name').val(),
        msg: $('#message').val()
      });
      
      $('#message').val('');
    }
  };

  Chat.initialize('http://localhost/');

      $('.on_off :checkbox').iphoneStyle();
      $('.disabled :checkbox').iphoneStyle();
      $('.css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
      $('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
      
      var onchange_checkbox = ($('.onchange :checkbox')).iphoneStyle({
        onChange: function(elem, value) { 
          $('span#status').html(value.toString());
        }
      });
      
   $("input, textarea").focus(function(){$(this).css("color", "black")});
   
   $("a").click(function(e){
	   e.preventDefault();
	   var url = $(this).attr("href");
	   getPage(url);	   
   });

  
})(jQuery, this)


function getLocation(lLength)
  {
	lineLength = lLength;
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
  console.log(position);
  x.innerHTML="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  $("#coords").val(position.coords.latitude+", "+position.coords.longitude);
  $("#line_length").val(lineLength);
  }
function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
  }
function getPage(url) {

	     $.ajax({ 
	           url: url,
	           type: 'POST',
	           cache: false, 
	           success: function(data){
	           	  markup = data;
	           	  console.log(data);
	           	  $("body > section").last().replaceWith(data);
	           	  setTimeout(function(){
	           		$("body > section").last().addClass("active");  
	           	  }, 1000);           		  	           	  
	           }
	           , error: function(jqXHR, textStatus, err){
	               //alert('text status '+textStatus+', err '+err)
	               console.log('text status '+textStatus+', err '+err);
	           }
	        });
  
 }            
