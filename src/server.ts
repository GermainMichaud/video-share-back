import express from 'express';

import loadMiddlewares from './middlewares';
import loadRoutes from './routes';
import { ProvidersName } from './utils/providers';

declare module 'express-session' {
  interface SessionData {
    open_id: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    provider: ProvidersName;
    redirect_client_url: string;
  }
}

const createServer = () => {
  const app = express();

  loadMiddlewares(app);

  loadRoutes(app);

  return app;
};

export default createServer;
