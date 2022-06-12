const path = require('path');
const process = require('process');
const child_process = require('child_process');


function notify(audioFilePath) {

    // sound notification
    let notificationMedia = audioFilePath ? path.resolve(audioFilePath) : "";
    let notificationCommand;

    if (process.platform === "win32") {
        notificationCommand = notificationMedia ? `powershell.exe -c (New-Object Media.SoundPlayer "${notificationMedia}").PlaySync();` : "rundll32 user32.dll, MessageBeep"
    } else if (process.platform === "linux") {
        notificationCommand = notificationMedia ? `paplay ${notificationMedia}` : "echo -ne '\007'"
    } else if (process.platform === "darwin") {
        notificationCommand = notificationMedia ? `afplay ${notificationMedia}` : "tput bel"
    } else {
        notificationCommand = "";
    }

    child_process.exec(notificationCommand);
}


module.exports.notify = notify;
