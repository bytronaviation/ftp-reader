import { FtpConfigInterface } from './interfaces/FtpConfigInterface';
import { LoggerInterface } from './interfaces/LoggerInterface';
export declare function readFromFtp(ftpConfig: FtpConfigInterface, logger: LoggerInterface, filter: Function, grouper: Function, sorter: Function, processor: Function, ftpBasePath: string): Promise<void>;
