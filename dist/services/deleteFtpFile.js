"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utilities/logger");
function deleteFtpFile(sftpClient, fullFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logInfo(`Attempting to delete file ${fullFileName}`);
        yield sftpClient.delete(fullFileName);
        logger_1.logInfo(`File archived`);
        return true;
    });
}
exports.deleteFtpFile = deleteFtpFile;
//# sourceMappingURL=deleteFtpFile.js.map