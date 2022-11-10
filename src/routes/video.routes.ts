/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { uploadVideoHandler } from '../controllers/video.controller';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateRequest';
import { videoRequestSchema } from '../schemas/video.schema';

const router = Router();

/**
 * @openapi
 * /api/video/upload:
 *  post:
 *   tags:
 *    - Video
 *   requestBody:
 *    description: Video to upload
 *    required: true
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       properties:
 *        video:
 *         type: string
 *         format: binary
 *         description: Upload video
 *   description: Oauth endpoint
 *   responses:
 *    200:
 *     description: Connect to provider
 */
router.post('/upload', auth, validate(videoRequestSchema), uploadVideoHandler);

export default router;
