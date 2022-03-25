const progressBar = require("./myProgressBar");

// Main for testing the Progress Bar!
let loop_len = 100;
let counter = 0;
let resumeFrom = 30;
let startTime = new Date();

for (i = 0; i < loop_len; ++i) {
    counter = progressBar.myProgressBar(counter, loop_len, startTime);

    if (counter < resumeFrom) {
        console.log("> skipping", counter);
        continue;
    }

    // do some time consuming task in loop
    var waitTill = new Date(new Date().getTime() + 100);
    while(waitTill > new Date()){}
}
