const path = require('path');
const process = require('process');
const child_process = require('child_process');


function notify() {

    // sound notification
    let notificationMedia = path.resolve(__dirname, "../resources/Alarm05.wav");
    console.log(notificationMedia);
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


module.exports.notify = notify;
