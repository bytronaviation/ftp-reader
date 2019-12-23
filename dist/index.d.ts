import { FtpConfigInterface } from './interfaces/FtpConfigInterface';
import { LoggerInterface } from './interfaces/LoggerInterface';
export declare function readFromFtp(ftpConfig: FtpConfigInterface, logger: LoggerInterface, filter: Function, grouper: Function, sorter: Function, processor: (sftpClient: any, fileGroup: any) => void, ftpBasePath: string): Promise<void>;
export { getFtpFile } from './services/getFtpFile';
export { getFtpFileList } from './services/getFtpFileList';
export { getSftpConnection } from './services/getSftpConnection';
export { moveFtpFile } from './services/moveFtpFile';
export { deleteFtpFile } from './services/deleteFtpFile';
export { FtpConfigInterface };
