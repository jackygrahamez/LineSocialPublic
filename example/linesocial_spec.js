var timeout = 10000,
    number = Math.floor((Math.random()*10000000000)+1),
    firstname = "qa_first",
    lastname = "qa_last",
    username = "qa_"+number,
    email = username+"@test.com",
    password = "abc";    

browser.driver.manage().timeouts().setScriptTimeout = 2000;

console.log("number "+username);

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

  it('Register Page', function() {
      browser.driver.get('http://localhost:5000')
        .then(function(){
          browser.driver.executeScript("$(\"#register\").click()");
          setTimeout(function(){
            var promise = browser.driver.findElement(by.css('#submit')).getAttribute('value');
            promise.then(function(buttonText) {
              console.log("submit is: " + buttonText);
              expect(buttonText).toMatch('Register Now');
            });
          }, timeout);            
        });     
  });

    it('Register User', function() {
      browser.driver.get('http://localhost:5000')
        .then(function(){  
          browser.driver.executeScript("$(\"#register\").click()");
          setTimeout(function(){
            var promise = browser.driver.findElement(by.css('#submit')).getAttribute('value');
            promise.then(function(buttonText) {
              browser.driver.findElement(By.css("input[name='firstName']")).sendKeys(firstname);
              browser.driver.findElement(By.css("input[name='lastName']")).sendKeys(lastname);
              browser.driver.findElement(By.css("input[name='username']")).sendKeys(username);
              browser.driver.findElement(By.css("input[name='email']")).sendKeys(email);
              browser.driver.findElement(By.css("input[name='cemail']")).sendKeys(email);
              browser.driver.findElement(By.css("input[name='password']")).sendKeys(password);
              browser.driver.findElement(By.css("input[name='cpassword']")).sendKeys(password); 
              browser.driver.executeScript("$('#terms').prop('checked', true);");
              browser.driver.executeScript("$(\"#submit\").click()");                                             
              console.log("submit is: " + buttonText);
              setTimeout(function(){
                var promise = browser.driver.findElement(by.css("a[href='/forgot_password']")).getText();

                promise.then(function(forgot_password) {
                  console.log("User Registered. Homepage forgot password: " + forgot_password);
                  expect(forgot_password).toMatch('Forgot Password?');
                });                
              }, timeout);
            });
          }, timeout);            
        });     
    });  

});

 