const timeConverter = require('./utils/time-converter');
const soundAlert = require('./utils/sound-alert');

/**
 * A Basic CLI Progress bar to track progress in a long running job in a loop
 * @param {Number} currentStep the current iteration number in the loop. eg: i, index or count
 * @param {Number} totalSteps total number of steps that the loop will run for
 * @param {Date} startTime pass the start time of the loop. It should be a Date object. eg: 'new Date()'
 * @param {Number} clearScreenEvery console to be cleared off every ith iteration of this value. default: 1
 * @param {Number} barLength the length of the progress bar. default: 50
 * @param {Number} style choose styles from 0 - 4
 * @param {Boolean} notify set true for sound alert notification when complete. false to turn it off
 * @returns {Number} currentStep++
 */
function progressBar(currentStep, totalSteps, startTime, clearScreenEvery=1, barLength=50, style=4, notify=true) {
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
        if (notify) { soundAlert.notify() }
    }

    return currentStep;
}


module.exports.progressBar = progressBar;
