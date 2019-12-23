import { logInfo } from '../utilities/logger';

export async function getFtpFileList(sftpClient, basePath: string): Promise<string[]> {
  logInfo(`Attempting to get all a list of all files on FTP server`);

  return await sftpClient.list(basePath || '/');
}
