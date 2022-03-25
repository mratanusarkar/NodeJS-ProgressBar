const child_process = require('child_process');


function myProgressBar(currentStep, totalSteps, startTime, clearScreenEvery=1, barLength=50, style=3) {
    // style
    let styleList = [
        { pending: ' ', complete: '.' },
        { pending: ' ', complete: '=' },
        { pending: '-', complete: '=' },
        { pending: '-', complete: '#' },
        { pending: '\u2591', complete: '\u2588' }
    ];

    // counter to track progress and clear terminal every x iteration
    if (currentStep % clearScreenEvery === 0) { console.clear() }

    currentStep++;

    let timeElapsed = (new Date().getTime() - startTime.getTime()) / 1000; 
    let progress = Math.round(currentStep * barLength * 1.0 / totalSteps);
    let percent = (currentStep * 100.0 / totalSteps).toFixed(2);
    let estimatedTotalTime = (timeElapsed * totalSteps * 1.0 / currentStep).toFixed(3);

    console.log(`[${styleList[style].complete.repeat(progress)}${styleList[style].pending.repeat(barLength - progress)}] ${percent} % (${(currentStep / timeElapsed).toFixed(2)} iter/sec)`);
    console.log(`> Iteration: ${currentStep}/${totalSteps} > Completed: ${percent}% > Time Elapsed: ${timeElapsed}sec > Estimated Time to Completion: ${(estimatedTotalTime - timeElapsed).toFixed(3)}sec`);
    console.log(`> Estimated Total Time: ${estimatedTotalTime}sec = ${(estimatedTotalTime/60).toFixed(3)}min = ${(estimatedTotalTime/3600).toFixed(3)}hr`);

    // process complete actions
    if (currentStep === totalSteps) {
        console.log("Task Completed!!");

        // sound notification
        let notificationMedia = "./resources/Alarm05.wav";
        let notificationCommand = `powershell.exe -c (New-Object Media.SoundPlayer "${notificationMedia}").PlaySync();`;

        child_process.exec(notificationCommand);
    }

    return currentStep;
}


module.exports.myProgressBar = myProgressBar;
