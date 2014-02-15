var timeout = 200,
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


			var promise = browser.driver.findElement(by.css('h1')).getText();

			promise.then(function(header) {
			 	console.log("header is: " + header);
			 	expect(header).toMatch('LineSocial');
			});  	
  });
/*
  it('Register Page', function() {

    browser.driver.executeScript("$(\"#register\").click()")
      .then(function() {
        var promise = browser.driver.findElement(by.id('submit'));
        promise.getAttribute('value')
          .then(function(buttonText) {
            console.log("promise start: " + buttonText);
            expect(true).toMatch(true);             
          });              
      });
       
  });

    it('Register User', function() {

          browser.driver.executeScript("$(\"#register\").click()");
          console.log("start register user timeout");
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
                console.log("forgot_password");
                var promise = browser.driver.findElement(by.css("a[href='/forgot_password']")).getText();

                promise.then(function(forgot_password) {
                  console.log("User Registered. Homepage forgot password: " + forgot_password);
                  expect(forgot_password).toMatch('Forgot Password?');
                });                
              }, timeout);
            });
            console.log("end register user timeout");
          }, timeout);            
        expect(true).toMatch(true);
    });  
*/
});

describe("Asynchronous specs", function() {
  var value, flag;
  it("should support async execution of test preparation and expectations", function() {
    runs(function() {
      flag = false;
      value = 0;
      browser.driver.executeScript("$(\"#register\").click()").then(function(){
        setTimeout(function(){
          var promise = browser.driver.findElement(by.css('.wrapper #submit')).getAttribute("value");
          promise.then(function(buttonText) {
            console.log("buttonText "+buttonText);
            expect(buttonText).toMatch("Register Now");
          });  
          setTimeout(function(){
            browser.driver.findElement(By.css(".wrapper input[name='firstName']")).sendKeys(firstname);
            browser.driver.findElement(By.css(".wrapper input[name='lastName']")).sendKeys(lastname);
            browser.driver.findElement(By.css(".wrapper input[name='username']")).sendKeys(username);
            browser.driver.findElement(By.css(".wrapper input[name='email']")).sendKeys(email);
            browser.driver.findElement(By.css(".wrapper input[name='cemail']")).sendKeys(email);
            browser.driver.findElement(By.css(".wrapper input[name='password']")).sendKeys(password);
            browser.driver.findElement(By.css(".wrapper input[name='cpassword']")).sendKeys(password); 
            browser.driver.executeScript("$('#terms').prop('checked', true);");
            browser.driver.executeScript("$(\".wrapper #submit\").click()");                                             
            setTimeout(function(){
              browser.driver.findElement(By.id("inputEmail")).sendKeys(email);
              browser.driver.findElement(By.id("inputPassword")).sendKeys(password);              
              browser.driver.findElement(By.id("submit")).click();

            }, 2000);
          }, 1000);          
        }, 2000);
      });
      setTimeout(function() {
        flag = true;
      }, 20000);
    });
    waitsFor(function() {
      value++;
      return flag;
    }, "The Value should be incremented", 60000);
    runs(function() {
      expect(value).toBeGreaterThan(0);
    });
  });
});            

 