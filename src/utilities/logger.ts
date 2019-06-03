import {upperFirst} from 'lodash';
import {LoggerInterface} from '../interfaces/LoggerInterface';

let heldLogger = null;

function doTheLog(type, message) {
  if (!heldLogger) {
    console.log(`${upperFirst(type)}: ${message}`);

    return;
  }

  if (!heldLogger[type]) {
    throw new Error(`Invalid ${type} given for logging.`);
  }

  heldLogger[type](message);
}

export function setLogger(logger: LoggerInterface) {
  heldLogger = logger;
}

export function removeLogger() {
  heldLogger = null;
}

export function logError(message: string) {
  doTheLog('error', message);
}

export function logInfo(message: string) {
  doTheLog('info', message);
}

export function logWarning(message: string) {
  doTheLog('warn', message);
}
