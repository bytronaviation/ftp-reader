import {FtpConfigInterface} from '../interfaces/FtpConfigInterface';
const SftpClient = require('ssh2-sftp-client');

export async function getSftpConnection(ftpConfig: FtpConfigInterface) {
  const sftpClient = new SftpClient();

  await sftpClient.connect(ftpConfig);

  return sftpClient;
}
