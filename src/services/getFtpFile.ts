import {logInfo} from '../utilities/logger';

export async function getFtpFile(sftpClient, filename): Promise<Buffer> {
  logInfo(`Attempting to read file ${filename}`);

  return await sftpClient.get(filename);
}
