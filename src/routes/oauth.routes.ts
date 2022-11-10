/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  callbackOauthHandler,
  connectOauthHandler,
  disconnectOauthHandler,
  refreshTokenHandler,
} from '../controllers/oauth.controller';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateRequest';
import { oauthcallbackRequest, oauthRequest } from '../schemas/oauth.schema';

const router = Router();

/**
 * @openapi
 * /api/oauth/refreshtoken:
 *  get:
 *   tags:
 *    - Oauth
 *   description: Refresh token endpoint
 *   responses:
 *    200:
 *     description: Refresh token
 *    401:
 *     description: Unauthorized
 */
router.get('/refreshtoken', auth, refreshTokenHandler);

/**
 * @openapi
 * /api/oauth/disconnect:
 *  get:
 *   tags:
 *   - Oauth
 *   description: Disconnect from provider
 *  responses:
 *   200:
 *    description: Disconnect from provider
 *   401:
 *    description: Unauthorized
 */
router.get('/disconnect', auth, disconnectOauthHandler);

/**
 * @openapi
 * /api/oauth/{provider}:
 *  get:
 *   tags:
 *    - Oauth
 *   parameters:
 *     - in: path
 *       name: provider
 *       schema:
 *         type: string
 *         enum: [tiktok]
 *       required: true
 *       description: Oauth provider

 *   description: Oauth endpoint
 *   responses:
 *    302:
 *     description: Connect to provider
 */
router.get('/:provider', validate(oauthRequest), connectOauthHandler);

/**
 * @openapi
 * /api/oauth/{provider}/callback:
 *  get:
 *   tags:
 *    - Oauth
 *   parameters:
 *     - in: path
 *       name: provider
 *       schema:
 *         type: string
 *         enum: [tiktok]
 *       required: true
 *       description: Oauth provider
 *     - in: query
 *       name: code
 *       type: string
 *       description: Oauth code
 *       required: true
 *     - in: query
 *       name: scopes
 *       type: string
 *       description: Oauth scopes
 *       required: true
 *     - in: query
 *       name: state
 *       type: string
 *       description: Oauth state
 *       required: true

 *   description: Oauth endpoint
 *   responses:
 *    200:
 *     description: Connect to provider
 */
router.get('/:provider/callback', validate(oauthcallbackRequest), callbackOauthHandler);

export default router;
