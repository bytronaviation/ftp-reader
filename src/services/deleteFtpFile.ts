import {logInfo} from '../utilities/logger';

export async function deleteFtpFile(sftpClient, fullFileName: string) {
  logInfo(`Attempting to delete file ${fullFileName}`);
  await sftpClient.delete(fullFileName);
  logInfo(`File archived`);

  return true;
}
