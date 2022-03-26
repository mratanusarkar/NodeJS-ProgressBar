/**
 * Function that takes in a Time in ms and returns a String which represents the time in human readable format
 * @param {Number} milliseconds time in milliseconds
 * @param {Number} toDecimalPlace significant figure upto decimal places for ms. default: 3
 * @returns {String} time in human readable format in terms of days, hours, minutes, seconds and milliseconds
 */
function toHumanTime(milliseconds, toDecimalPlace=3) {

    if (milliseconds === 0) { return "0ms"; }
    if (milliseconds === NaN) { return "NaN"; }
    if (milliseconds === Infinity) { return "Infinity"; }
    if (!milliseconds) { return "NaN"; }

    let days = ~~(milliseconds / (24 * 60 * 60 * 1000));
    milliseconds = milliseconds % (24 * 60 * 60 * 1000);

    let hours = ~~(milliseconds / (60 * 60 * 1000));
    milliseconds = milliseconds % (60 * 60 * 1000);

    let minutes = ~~(milliseconds / (60 * 1000));
    milliseconds = milliseconds % (60 * 1000);

    let seconds = ~~(milliseconds / (1000));
    milliseconds = milliseconds % (1000);

    let ms = +milliseconds.toFixed(toDecimalPlace)

    let humanReadableString = "";

    humanReadableString += days > 0 ? `${days}day ` : '';
    humanReadableString += hours > 0 ? `${hours}hr ` : '';
    humanReadableString += minutes > 0 ? `${minutes}min ` : '';
    humanReadableString += seconds > 0 ? `${seconds}sec ` : '';
    humanReadableString += ms > 0 ? `${ms}ms ` : '';

    return humanReadableString;

}

module.exports.toHumanTime = toHumanTime;
