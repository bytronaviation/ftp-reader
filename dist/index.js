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
const bluebird_1 = require("bluebird");
const logger_1 = require("./utilities/logger");
const getSftpConnection_1 = require("./services/getSftpConnection");
function getSftpFiles(sftpClient, basePath, filter, grouper, sorter) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseFiles = yield sftpClient.list(basePath || '/');
        const filteredFiles = filter(baseFiles);
        const groupedFiles = grouper(filteredFiles);
        return sorter(groupedFiles);
    });
}
function processFile(sftpClient, processor, fileGroup) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield processor(sftpClient, fileGroup);
        }
        catch (error) {
            logger_1.logError(`fileGroup failed to process. Error: ${error.toString()} - FileGroup: ${JSON.stringify(fileGroup)}`);
        }
    });
}
function readFromFtp(ftpConfig, logger, filter, grouper, sorter, processor, ftpBasePath) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.setLogger(logger);
        const sftpClient = yield getSftpConnection_1.getSftpConnection(ftpConfig);
        const fileGroupsList = yield getSftpFiles(sftpClient, ftpBasePath, filter, grouper, sorter);
        yield bluebird_1.each(fileGroupsList, processFile.bind(null, sftpClient, processor));
        sftpClient.end();
        logger_1.removeLogger();
    });
}
exports.readFromFtp = readFromFtp;
var getFtpFile_1 = require("./services/getFtpFile");
exports.getFtpFile = getFtpFile_1.getFtpFile;
var getFtpFileList_1 = require("./services/getFtpFileList");
exports.getFtpFileList = getFtpFileList_1.getFtpFileList;
var getSftpConnection_2 = require("./services/getSftpConnection");
exports.getSftpConnection = getSftpConnection_2.getSftpConnection;
var moveFtpFile_1 = require("./services/moveFtpFile");
exports.moveFtpFile = moveFtpFile_1.moveFtpFile;
var deleteFtpFile_1 = require("./services/deleteFtpFile");
exports.deleteFtpFile = deleteFtpFile_1.deleteFtpFile;
//# sourceMappingURL=index.js.map