import { createServer, ServerResponse, IncomingMessage } from 'http';
import { sendResponse } from './utils/sendResponse';
import { getHandling } from './utils/getHandling';
import { postHandling } from './utils/postHandling';
import { putHandling } from './utils/putHandling';
import { deleteHandler } from './utils/deleteHandler';

export const server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    if (method === 'GET' && url?.startsWith('/api/users')) {
      getHandling(res, url);
    } else if (method === 'POST' && url === '/api/users') {
      postHandling(req, res);
    } else if (method === 'PUT' && url?.startsWith('/api/users/')) {
      putHandling(req, res, url);
    } else if (method === 'DELETE' && url?.startsWith('/api/users/')) {
      deleteHandler(res, url);
    } else {
      sendResponse(res, 404, { error: 'Not Found' });
    }
  }
);
