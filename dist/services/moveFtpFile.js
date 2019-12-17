"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utilities/logger");
function moveFtpFile(sftpClient, filename, content, oldBasePath, newBasePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalPath = `${oldBasePath}/${filename}`;
        const newFilePath = `${newBasePath}/${filename}`;
        logger_1.logInfo(`Got file ${filename} to archive. Moving to ${newFilePath}.`);
        try {
            yield sftpClient.rename(originalPath, newFilePath);
        }
        catch (error) {
            logger_1.logError(`Errored attempting to rename file ${originalPath}. Calling put/delete instead.`);
            yield sftpClient.put(content, newFilePath);
            yield sftpClient.delete(originalPath);
        }
        logger_1.logInfo(`File archived`);
        return true;
    });
}
exports.moveFtpFile = moveFtpFile;
//# sourceMappingURL=moveFtpFile.js.map