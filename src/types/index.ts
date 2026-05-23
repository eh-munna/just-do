import type { IncomingMessage, ServerResponse } from 'http';

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export type ContentType = 'text/html' | 'application/json' | 'text/plain';
