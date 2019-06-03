/// <reference types="node" />
export declare function moveFtpFile(sftpClient: any, filename: string, content: Buffer, oldBasePath: string, newBasePath: string): Promise<boolean>;
