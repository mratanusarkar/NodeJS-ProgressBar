function myProgressBar(currentStep, totalSteps, startTime) {
    
    currentStep++;
    console.clear();

    let timeElapsed = (new Date().getTime() - startTime.getTime()) / 1000; 
    let progress = Math.round(currentStep * 50 * 1.0 / totalSteps);
    let percent = (currentStep * 100.0 / totalSteps).toFixed(2);
    let estimatedTotalTime = (timeElapsed * totalSteps * 1.0 / currentStep).toFixed(3);

    console.log(`[${'='.repeat(progress)}${'-'.repeat(50 - progress)}] ${percent} % (${(currentStep / timeElapsed).toFixed(2)} iter/sec)`);
    console.log(`> Iteration: ${currentStep}/${totalSteps} > Completed: ${percent}% > Time Elapsed: ${timeElapsed}sec > Estimated Time to Completion: ${(estimatedTotalTime - timeElapsed).toFixed(3)}sec`);
    console.log(`> Estimated Total Time: ${estimatedTotalTime}sec = ${(estimatedTotalTime/60).toFixed(3)}min = ${(estimatedTotalTime/3600).toFixed(3)}hr`);

    // process complete actions
    if (currentStep === totalSteps) {
        console.log("Task Completed!!");
    }

    return currentStep;
}


module.exports.myProgressBar = myProgressBar;
