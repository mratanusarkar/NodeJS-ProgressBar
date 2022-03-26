# NodeJS-ProgressBar
[![HitCount](https://hits.dwyl.com/mratanusarkar/NodeJS-ProgressBar.svg?style=flat)](http://hits.dwyl.com/mratanusarkar/NodeJS-ProgressBar)

CLI Progress Bar implemented in NodeJS to track Time, ETA and Steps for any long running jobs in any loops in JS, NodeJS code

Did you ever encounter long running processes or jobs running inside loops in javascript or nodejs? <br>
Did you ever encounter tasks where nodejs scripts are running in a server, making multiple api calls in long running loops?

If you are tired of sitting and waiting for these processes and not knowing when this kind of job/loop will end <br>
If you want to have a metrics that will show you the current iteration number of the loop, eta of the job, time elapsed, time to finish, estimated total time <br>
along with a cool cli progress bar, and even notify you with an alert sound when the job ends, then you are at the right place!


# Features
The function progressBar() can be applied to any deterministic loop with finite and determined loop_len. <br>
It has the following parameters and features:
- **currentStep**: the current iteration number in the loop. eg: i, index or count
- **totalSteps**: total number of steps that the loop will run for
- **startTime**: pass the start time of the loop. It should be a Date object. eg: 'new Date()'
- **clearScreenEvery**: console to be cleared off every ith itheration of this value. default: 1
- **barLength**: the length of the progress bar. default: 50
- **style**: choose styles from 0 - 4
- **notify**: set true for sound alert notofocation when complete. false to turn it off

# Usage
```node
const progressBar = require("./progress-bar");

let loop_len = 1000;
let startTime = new Date();
for (i = 0; i < loop_len; ++i) {
    // call progressBar at the start of the loop block
    progressBar.progressBar(i, loop_len, startTime);
    
    /** START OF LONG RUNNING JOB/PROCESS IN LOOP*/
    //
    // Insert your CODE Here!!
    //
    /** END OF LONG RUNNING JOB/PROCESS IN LOOP*/
}
```


If the job get's haulted in the middle or if the Job was multiple API calls in a loop, and maybe due to network issues the process got haulted, <br>
you can trace the last iteration of the running job from log files (if you are maintaining any), and resume the job from that ith iteration using the following code:

```node
const progressBar = require("./progress-bar");

let resumeFrom = 50;
let loop_len = 1000;
let startTime = new Date();
for (i = 0; i < loop_len; ++i) {
    // call progressBar at the start of the loop block
    progressBar.progressBar(i, loop_len, startTime);
    
    // code to skip to the ith iteration and continue from there
    if (i < resumeFrom) {
        console.log("> skipping", i);
        continue;
    }
    
    /** START OF LONG RUNNING JOB/PROCESS IN LOOP*/
    //
    // Insert your CODE Here!!
    //
    /** END OF LONG RUNNING JOB/PROCESS IN LOOP*/
}
```


# Example
Below are some of the example codes where progressBar is used.

1. using for loop:
```node
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

```

2. using while loop
```node
const progressBar = require("./progress-bar");

// Main for testing the Progress Bar!
let loop_len = 100;
let counter = 0;
let startTime = new Date();

console.time("total system time");
while (counter < loop_len) {
    counter = progressBar.progressBar(counter, loop_len, startTime);

    // do some time consuming task in loop
    var waitTill = new Date(new Date().getTime() + 100);
    while(waitTill > new Date()){}
}
console.timeEnd("total system time");

```

TODO: add examples for forEach, for/in, for/of, do/while and other types of loops in js and node <br>
TODO: add support for async loops in js and node

