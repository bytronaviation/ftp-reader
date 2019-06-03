import {logError, logInfo} from '../utilities/logger';

export async function moveFtpFile(
  sftpClient,
  filename: string,
  content: Buffer,
  oldBasePath: string,
  newBasePath: string
) {
  const originalPath = `${oldBasePath}/${filename}`;
  const newFilePath = `${newBasePath}/${filename}`;

  logInfo(`Got file ${filename} to archive. Moving to ${newFilePath}.`);

  try {
    await sftpClient.rename(originalPath, newFilePath);
  } catch (error) {
    logError(`Errored attempting to rename file ${originalPath}. Calling put/delete instead.`);

    await sftpClient.put(content, newFilePath);
    await sftpClient.delete(originalPath);
  }

  logInfo(`File archived`);

  return true;
}