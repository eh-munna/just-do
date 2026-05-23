import type { IncomingMessage, ServerResponse } from 'http';
import type { ContentType } from '../types';

export const sendResponse = <T>(
  res: ServerResponse,
  statusCode: number,
  contentType: ContentType,
  data: T,
) => {
  res.writeHead(statusCode, {
    'content-type': contentType,
  });
  res.end(
    contentType === 'application/json' ? JSON.stringify(data) : String(data),
  );
};

export const bodyParser = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
  });
};
