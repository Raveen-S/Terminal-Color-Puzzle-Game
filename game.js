const readline = require('readline');

const logError = (message) => {
    console.error(`\x1b[31mError: ${message}\x1b[0m`);
};

const logWarning = (message) => {
    console.warn(`\x1b[33mWarning: ${message}\x1b[0m`);
};

const logSuccess = (message) => {
    console.log(`\x1b[32mSuccess: ${message}\x1b[0m`);
};

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// ---------------------------------------
let cellCount = 4;
let tubes = [
    [1, 2, 3, 4],
    [2, 4, 1, 3],
    [1, 4, 1, 2],
    [3, 4, 2, 3],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]

let tubesCount = tubes.length;

run();

async function puring(tube1, tube2) {
    // tube1 goes into tube2

    // Finding the free space of the tube2 to pure and it's surface value
    let tube2FreeCount = 0;
    let tube2SurfaceVal = 0;

    for (const val of tube2) {
        if (val == 0)
            tube2FreeCount++;
        else {
            tube2SurfaceVal = val;
            break;
        }
    }

    let tube1PuringCount = 0;
    let tube1SurfaceVal = 0;

    for (const val of tube1) {
        if (val != 0) {
            tube1SurfaceVal = val;
            break;
        }
    }

    // If no space to pure and if the surface values are not match then return,
    if (!tube2FreeCount || (tube1SurfaceVal != tube2SurfaceVal)) {
        if (tube2SurfaceVal) {
            console.log(` `)
            logWarning(`can't pour`)
            return;
        }
    }

    // counting How much same value can pure from tube 1
    let tube1flow = false;
    for (const val of tube1) {
        if (val == 0 && !tube1flow) {
            continue;
        }
        else if (tube1SurfaceVal == val) {
            tube1flow = true;
            tube1PuringCount++
        }
        else break;
    }

    let actualPureCount = 0;
    if (tube1PuringCount >= tube2FreeCount) actualPureCount = tube2FreeCount;
    else actualPureCount = tube1PuringCount;


    //----------------------- Puring Process ------------------------

    let tube1StartingIndex = tube1.indexOf(tube1SurfaceVal);
    let tube2StartingIndex = tube2.indexOf(tube2SurfaceVal) - 1;
    if (tube2FreeCount == cellCount) tube2StartingIndex = cellCount - 1;

    for (let i = 0; i < actualPureCount; i++) {
        tube1[tube1StartingIndex] = 0;
        tube1StartingIndex++;

        tube2[tube2StartingIndex] = tube1SurfaceVal;
        tube2StartingIndex--;
    }
}


async function printArrays(arr) {

    let ArrayEligibility = true;
    if (arr.length == 0) ArrayEligibility = false;
    for (const tube of arr) {
        if (tube.length != cellCount) {
            console.log('')
            console.log('Something Wrong with the values of the Tubes')
            console.log('')
            return;
        }
    }



    // Set heading Numbers of the Tubes
    let textLine = "";
    for (const index in arr) {
        let number = index * 1 + 1;
        // if (number == arr.length)
        //     textLine += `    \x1b[44m ${number} \x1b[0m`
        // else
        //     textLine += `    \x1b[44m ${number} \x1b[0m    `
        textLine += `     ${number}     `
    }
    console.log('');
    console.log(textLine);
    console.log('');



    // Set Values In to Tubes Based on Index, each time one value for one tube
    let indexTube = arr[0];

    for (let index in indexTube) {
        let textLine = "";
        for (let i in arr) {
            let val = arr[i][index];
            if (val >= 10)
                textLine += `  | \x1b[48;5;${val + 8}m   \x1b[0m|  `
            // textLine += `  | \x1b[48;5;${val + 8}m ${val} \x1b[0m|  `
            else
                textLine += `  | \x1b[48;5;${val}m   \x1b[0m |  `
            // textLine += `  | \x1b[48;5;${val}m ${val} \x1b[0m |  `
        };
        console.log(textLine);
    }


    // Set the bottom curves of the Tubes
    textLine = "";
    for (const index in arr) {
        textLine += `   \\___/   `
    }
    console.log(textLine);
}

// ---------------------------------------


async function run() {

    printArrays(tubes)
    console.log('\x1b[32mex:- 1 5 ; tube 1 goes to tube 5, must have a space between them\x1b[0m');
    let gameEndLoop = 5;
    for (let i = 0; i < gameEndLoop; i++) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        let t1 = 0;
        let t2 = 0;
        let loopLimit = 5;
        for (let i = 0; i < loopLimit; i++) {

            const userInput = await new Promise(resolve => {
                rl.question('Enter a value: ', resolve);
            });
            let result = inputValidation(userInput, tubesCount);

            if (!result[0]) {
                if (result[1] == 'close') {
                    process.stdout.write('\x1Bc');
                    rl.close();
                    return
                }
                loopLimit++
                continue;
            }

            t1 = result[1][0] - 1;
            t2 = result[1][1] - 1;
            break;
        }


        process.stdout.write('\x1Bc');
        puring(tubes[t1], tubes[t2])
        printArrays(tubes)
        console.log('')
        rl.close();
        if (winCheck(tubes)) {
            logSuccess('YOU WON!!!');
            gameEndLoop = 0;
        }
        else gameEndLoop++
    }

}


function inputValidation(str, tubesCount) {
    let valid = true;
    let out = [];
    if (str == 'cls') return [false, 'close'];
    let array = str.split(' ');
    if (array.length != 2) valid = false;
    let val1 = array[0] * 1;
    let val2 = array[1] * 1;
    if (val1 == val2) valid = false;
    if (isNaN(val1) && isNaN(val2)) valid = false;
    if ((val1 > 0 && val1 <= tubesCount) && (val2 > 0 && val2 <= tubesCount)) {
        out[0] = val1;
        out[1] = val2;
    }
    else valid = false;
    if (!valid) logWarning('Enter Valid Input')
    return [valid, out];
}

function winCheck(arr) {
    for (let subArr of arr) {
        let fistVal = subArr[0]
        for (let val of subArr) {
            if (val != fistVal) {
                return false;
            }
        };
    };
    return true;
}