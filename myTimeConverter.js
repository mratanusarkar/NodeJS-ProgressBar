function toHumanTime(milliseconds) {

    let days = ~~(milliseconds / (24 * 60 * 60 * 1000));
    milliseconds = milliseconds % (24 * 60 * 60 * 1000);

    let hours = ~~(milliseconds / (60 * 60 * 1000));
    milliseconds = milliseconds % (60 * 60 * 1000);

    let minutes = ~~(milliseconds / (60 * 1000));
    milliseconds = milliseconds % (60 * 1000);

    let seconds = ~~(milliseconds / (1000));
    milliseconds = milliseconds % (1000);

    let ms = milliseconds

    let humanReadableString = "";

    humanReadableString += days > 0 ? `${days}day ` : '';
    humanReadableString += hours > 0 ? `${hours}hr ` : '';
    humanReadableString += minutes > 0 ? `${minutes}min ` : '';
    humanReadableString += seconds > 0 ? `${seconds}sec ` : '';
    humanReadableString += ms > 0 ? `${ms}ms ` : '';

    return humanReadableString;

}

module.exports.toHumanTime = toHumanTime;
