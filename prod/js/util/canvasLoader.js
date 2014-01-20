/* canvas loader */
function PageLoader() {
var invalid = getURLParameter('invalid');
$(".overlay > div").canvasLoader();
	setTimeout(function() {
    $(".overlay").remove();
    setTimeout(function() {
   	$(".overlay > canvas").remove();
	if (invalid) {
		$("#inputPassword").after("<label class='invalid'>Invalid Login</label>");
		$("input").addClass("invalid");
	}   	
    }, 1000);
    }, 500);
}