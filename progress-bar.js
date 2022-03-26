const process = require('process');
const child_process = require('child_process');
const timeConverter = require('./utils/time-converter');

/**
 * A Basic CLI Progress bar to track progress in a long running job in a loop
 * @param {Number} currentStep the current iteration number in the loop. eg: i, index or count
 * @param {Number} totalSteps total number of steps that the loop will run for
 * @param {Date} startTime pass the start time of the loop. It should be a Date object. eg: 'new Date()'
 * @param {Number} clearScreenEvery console to be cleared off every ith itheration of this value. default: 1
 * @param {Number} barLength the length of the progress bar. default: 50
 * @param {Number} style choose styles from 0 - 4
 * @param {Boolean} notify set true for sound alert notofocation when complete. false to turn it off
 * @returns {Number} currentStep++
 */
function myProgressBar(currentStep, totalSteps, startTime, clearScreenEvery=1, barLength=50, style=4, notify=true) {
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

    let timeElapsed = (new Date().getTime() - startTime.getTime()); 
    let progress = Math.round(currentStep * barLength * 1.0 / totalSteps);
    let percent = (currentStep * 100.0 / totalSteps).toFixed(2);
    let estimatedTotalTime = (timeElapsed * totalSteps * 1.0 / currentStep);

    console.log(`[${styleList[style].complete.repeat(progress)}${styleList[style].pending.repeat(barLength - progress)}] ${percent} % (${(currentStep / (timeElapsed / 1000)).toFixed(2)} iter/sec)`);
    console.log(`> Iteration: ${currentStep}/${totalSteps} > Completed: ${percent}% > Time Elapsed: ${timeConverter.toHumanTime(timeElapsed)}`);
    console.log(`> Estimated Time to Completion: ${timeConverter.toHumanTime(estimatedTotalTime - timeElapsed)} > Estimated Total Time: ${timeConverter.toHumanTime(estimatedTotalTime)}`);

    // process complete actions
    if (currentStep === totalSteps) {
        console.log("Task Completed!!");

        if (notify) {
            // sound notification
            let notificationMedia = "./resources/Alarm05.wav";
            let notificationCommand;
            if (process.platform === "win32") {
                notificationCommand = `powershell.exe -c (New-Object Media.SoundPlayer "${notificationMedia}").PlaySync();`;
            } else if (process.platform === "linux") {
                notificationCommand = `paplay ${notificationMedia}`;
            } else if (process.platform === "darwin") {
                notificationCommand = "";   // TODO: support for macOs
            } else {
                notificationCommand = "";
            }

            child_process.exec(notificationCommand);
        }
    }

    return currentStep;
}


module.exports.myProgressBar = myProgressBar;
