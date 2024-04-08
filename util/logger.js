let interval;

const frames = [
    '\u280B',
    '\u2819',
    '\u2838',
    '\u2834',
    '\u2826',
    '\u2807'
];

function infoLoading(text) {
    let frame = 0;
    clearInterval(interval);

    interval = setInterval(() => {

        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
        process.stdout.write(`\x1b[34m${frames[frame]} ${text}`);

        if (frame === frames.length - 1) frame = 0;
        else frame += 1;

    }, 100);
}

function warnLoading(text) {
    let frame = 0;
    clearInterval(interval);

    interval = setInterval(() => {

        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
        process.stdout.write(`\x1b[33m${frames[frame]} ${text}`);

        if (frame === frames.length - 1) frame = 0;
        else frame += 1;

    }, 100);
}

function info(text) {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(`\x1b[34m${text}`);
}

function success(text) {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(`\x1b[1m\x1b[32mSUCCESS\x1b[0m ${text}`);
}

function error(text) {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(`\x1b[1m\x1b[31mERROR\x1b[0m ${text}`);
}

function lenny() {
    console.log('\x1b[34m');
    console.log(`
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++                ++++++++++++++++++++++++++++++++++                ++++++++
+++++++++   ++++++++++++          +++++++   +++++++++    +++++++++++++++++          +++++     ++++++
++++++++   +++++++++++  +   ++++   +++++++++  +++++++    +++++++++++++++  +   ++++   +++++   +  ++++
+++++++    ++++++++++++++   ++++   ++++++++++++++++++    ++++++++++++++++++   ++++   +++++    ++++++
++++++    ++++++++++++++++        +++++++++++++++++++      +++++++++++++++++        +++++++    +++++
++++++    ++++++++++++++++++    +++++++++++++++++++++        +++++++++++++++++    +++++++++    +++++
+++++     +++++++++++++++++++++++++++++++++++++++++++++++=    +++++++++++++++++++++++++++++     ++++
+++++    +++++++++++++++++++++++++++++++++++++++++++++++++     +++++++++++++++++++++++++++++    ++++
+++++    +++++++++++++++++++++++++++++++++++++++++++++++++     +++++++++++++++++++++++++++++    ++++
+++++    +++++++++++++++++++++++++++++++++++++++++++++++++     +++++++++++++++++++++++++++++    ++++
+++++    ++++++++++++++++++++++++++++++++++++++++   ++++++    +++++++++++++++++++++++++++++     ++++
++++++    ++++++++++++++++++++++++++++++++++++++     +++      +++++++++++++++++++++++++++++    +++++
++++++    ++++++++++++++++++++++++++++++++++++++++          +++++++++++++++++++++++++++++++    +++++
+++++++   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    ++++++
++++++++   ++++++++++++++++++++++++++++++++++  ++++++++++++++++++   ++++++++++++++++++++++   +++++++
+++++++++   +++++++++++++++++++++++++++++++++++    ++++++++++     +++++++++++++++++++++++   ++++++++
++++++++++  +++++++++++++++++++++++++++++++++++++++           ++++++++++++++++++++++++++   +++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    `);
}

module.exports = {
    infoLoading,
    warnLoading,
    info,
    success,
    error,
    lenny
};