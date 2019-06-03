import {each} from 'bluebird';
import {FtpConfigInterface} from './interfaces/FtpConfigInterface';
import {LoggerInterface} from './interfaces/LoggerInterface';
import {logError, removeLogger, setLogger} from './utilities/logger';
import {getSftpConnection} from './services/getSftpConnection';
import {getFtpFile} from './services/getFtpFile';
import {moveFtpFile} from './services/moveFtpFile';

async function getSftpFiles(sftpClient, basePath, filter, grouper, sorter) {
  const baseFiles = await sftpClient.list(basePath || '/');
  const filteredFiles = filter(baseFiles);
  const groupedFiles = grouper(filteredFiles);

  return sorter(groupedFiles);
}

async function processFile(sftpClient, fileGroup, processor: Function) {
  try {
    processor(sftpClient, getFtpFile, moveFtpFile, fileGroup);
  }
  catch (error) {
    logError(`fileGroup failed to process. Error: ${error.toString()} - FileGroup: ${JSON.stringify(fileGroup)}`);
  }
}

export async function readFromFtp(
  ftpConfig: FtpConfigInterface,
  logger: LoggerInterface,
  filter: Function,
  grouper: Function,
  sorter: Function,
  processor: Function,
  ftpBasePath: string
) {
  setLogger(logger);

  const sftpClient = await getSftpConnection(ftpConfig);
  const fileGroupsList = await getSftpFiles(sftpClient, ftpBasePath, filter, grouper, sorter);

  await each(fileGroupsList, processFile.bind(null, processor));

  sftpClient.end();

  removeLogger();
}