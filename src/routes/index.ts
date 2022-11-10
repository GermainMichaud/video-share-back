import { Application, Router } from 'express';

import healthcheckRoutes from './healthcheck.routes';
import oauthRoutes from './oauth.routes';
import userRoutes from './user.routes';
import videoRoutes from './video.routes';

const loadRoutes = (app: Application) => {
  const router = Router();

  router.use('/healthcheck', healthcheckRoutes);
  router.use('/oauth', oauthRoutes);
  router.use('/video', videoRoutes);
  router.use('/user', userRoutes);

  app.use('/api/', router);
};

export default loadRoutes;
