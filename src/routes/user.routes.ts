/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { currentUserHandler } from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = Router();

/**
 * @openapi
 * /api/user/me:
 *  get:
 *   tags:
 *    - User
 *   description: Get current user
 *   responses:
 *    200:
 *     description: Current user
 */
router.get('/me', auth, currentUserHandler);

export default router;
