const progressBar = require("./progress-bar");

// Main for testing the Progress Bar!
let loop_len = 100;
let counter = 0;
let resumeFrom = 0;
let startTime = new Date();

console.time("total system time");
for (i = 0; i < loop_len; ++i) {
    counter = progressBar.progressBar(counter, loop_len, startTime);

    if (counter < resumeFrom) {
        console.log("> skipping", counter);
        continue;
    }

    // do some time consuming task in loop
    var waitTill = new Date(new Date().getTime() + 100);
    while(waitTill > new Date()){}
}
console.timeEnd("total system time");
