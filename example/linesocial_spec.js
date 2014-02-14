
describe('LineSocial homepage', function() {
  it('Test Title', function() {
    browser.driver.get('http://localhost:5000')
    	.then(function(){
    		return browser.driver.getTitle().then(function(title) {
   				//return title === 'LineSocial';
   				expect(title).toEqual('LineSocial');
 			});
    	});   	
  });

  it('Test Header', function() {
    browser.driver.get('http://localhost:5000')
    	.then(function(){  

			var promise = browser.driver.findElement(by.css('h1')).getText();

			promise.then(function(header) {
			 	console.log("header is: " + header);
			 	expect(header).toMatch('LineSocial');
			});
    	});   	
  });


  describe('LineSocial Register Page', function() {

	  it('Register Page', function() {
	    browser.driver.get('http://localhost:5000')
	    	.then(function(){  
          browser.driver.executeScript("$(\"#register\").click()");
            var promise = browser.driver.findElement(by.css('#submit')).getAttribute('value');

            promise.then(function(buttonText) {
              console.log("submit is: " + buttonText);
              expect(buttonText).toMatch('Register Now');
            });          
	    	});   	
	  });

  });
});
