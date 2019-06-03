"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
let heldLogger = null;
function doTheLog(type, message) {
    if (!heldLogger) {
        console.log(`${lodash_1.upperFirst(type)}: ${message}`);
        return;
    }
    if (!heldLogger[type]) {
        throw new Error(`Invalid ${type} given for logging.`);
    }
    heldLogger[type](message);
}
function setLogger(logger) {
    heldLogger = logger;
}
exports.setLogger = setLogger;
function removeLogger() {
    heldLogger = null;
}
exports.removeLogger = removeLogger;
function logError(message) {
    doTheLog('error', message);
}
exports.logError = logError;
function logInfo(message) {
    doTheLog('info', message);
}
exports.logInfo = logInfo;
function logWarning(message) {
    doTheLog('warn', message);
}
exports.logWarning = logWarning;
//# sourceMappingURL=logger.js.map