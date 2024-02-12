import { ServerResponse } from 'http';
import { ApiResponse } from '../interfaces/data.interface';

export function sendResponse(
  res: ServerResponse,
  statusCode: number,
  body: ApiResponse
) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}
