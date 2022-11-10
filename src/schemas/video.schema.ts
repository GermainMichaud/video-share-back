import { z } from 'zod';

const videoRequestSchema = z.object({
  body: z.object({
    video: z.any({
      description: 'Video',
      required_error: 'Video is required',
    }),
  }),
});

type VideoRequest = z.infer<typeof videoRequestSchema>;

export { VideoRequest, videoRequestSchema };
