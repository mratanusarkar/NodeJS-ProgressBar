let loop_len = 100;
let counter = 0;
let startTime = new Date();


for (i = 0; i < loop_len; i++) {

    // my progress bar
    counter++;
    console.clear();

    let timeElapsed = (new Date().getTime() - startTime.getTime()) / 1000; 
    let progress = Math.round(counter * 50 * 1.0 / loop_len);
    let percent = (counter * 100.0 / loop_len).toFixed(2);
    let estimatedTotalTime = (timeElapsed * loop_len * 1.0 / counter).toFixed(3);

    console.log(`[${'='.repeat(progress)}${'-'.repeat(50 - progress)}] ${percent} % (${(counter / timeElapsed).toFixed(2)} iter/sec)`);
    console.log(`> Iteration: ${counter}/${loop_len} > Completed: ${percent}% > Time Elapsed: ${timeElapsed}sec > Estimated Time to Completion: ${(estimatedTotalTime - timeElapsed).toFixed(3)}sec`);
    console.log(`> Estimated Total Time: ${estimatedTotalTime}sec = ${(estimatedTotalTime/60).toFixed(3)}min = ${(estimatedTotalTime/3600).toFixed(3)}hr`);


    // do some time consuming task/job in loop
    var waitTill = new Date(new Date().getTime() + 100);
    while(waitTill > new Date()){}
}
