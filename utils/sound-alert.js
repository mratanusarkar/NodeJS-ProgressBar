const path = require('path');
const process = require('process');
const child_process = require('child_process');


function notify(audioFilePath) {

    // sound notification
    let notificationMedia = audioFilePath ? path.resolve(audioFilePath) : "";
    let notificationCommand;

    if (process.platform === "win32") {
        notificationCommand = `powershell.exe -c (New-Object Media.SoundPlayer "${notificationMedia}").PlaySync();`;
    } else if (process.platform === "linux") {
        notificationCommand = `paplay ${notificationMedia}`;
    } else if (process.platform === "darwin") {
        notificationCommand = `afplay ${notificationMedia}`;
    } else {
        notificationCommand = "";
    }

    child_process.exec(notificationCommand);
}


module.exports.notify = notify;
