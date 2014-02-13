var flow = webdriver.promise.controlFlow(),
   num = 0,
   start = Date.now();

function printStepNumber() {
 num += 1;
 console.log("task #" + num);
 return webdriver.promise.delayed(250);
}

flow.execute(printStepNumber);
flow.execute(printStepNumber);
flow.execute(printStepNumber).then(function() {
 var elapsed = Date.now() - start;
 console.log("All done; elapsed time: " + elapsed + " ms");
});
console.log("All tasks scheduled!");

// All tasks scheduled!
// task #1
// task #2
// task #3
// All done; elapsed time: 750 ms