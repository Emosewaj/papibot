function log(message, mode = "log") {
    let date = new Date();
    let hr = date.getHours().toString();
    let min = date.getMinutes().toString();
    let sec = date.getSeconds().toString();

    if (hr.length < 2) hr = "0" + hr;
    if (min.length < 2) min = "0" + min;
    if (sec.length < 2) sec = "0" + sec;

    let ts = `[${hr}:${min}:${sec}]`;
    let level = `[${mode.toUpperCase()}]`;

    let prefix = `${ts}${level}`.rightpad(" ", 17);

    let logfunc = mode == "warn" ? console.warn : (mode == "error" ? console.error : console.log);
    logfunc(`${prefix} ${message}`);
}

function warn(message) {
    log(message, "warn");
}

function error(message) {
    log(message, "error");
}

/**
 * Pad the string with characters to the left.
 * @param {string} padCharacter 
 * @param {number} length 
 * @returns {string}
 */
String.prototype.leftpad = function (padCharacter, length) {
    return padCharacter.repeat(length - this.toString().length) + this;
}

/**
 * Pad the string with characters to the right.
 * @param {string} padCharacter 
 * @param {number} length 
 * @returns {string}
 */
String.prototype.rightpad = function (padCharacter, length) {
    return this + padCharacter.repeat(length - this.toString().length);
}

Number.prototype.leftpad = String.prototype.leftpad;
Number.prototype.rightpad = String.prototype.rightpad;

/**
 * @param {number} max 
 * @returns {number}
 */
function randomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    log,
    warn,
    error,
    randomInt
}
