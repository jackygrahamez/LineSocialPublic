//redirect domain
function redirectDomain() {
	if ((location.href.indexOf("alpha.") < 0) && ((location.href.indexOf("localhost") < 0))) {
		if (page && path) {
			location.replace("https://alpha.xxxxx/"+location.pathname+"?"+page);			
			
		} else {
			location.replace("https://alpha.xxxxx");			
		}
	}
}