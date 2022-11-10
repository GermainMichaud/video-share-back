import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import session from 'express-session';
import helmet from 'helmet';

const loadMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(
    cors({
      origin: ['*', ...config.get<string>('origins').split(',')],
      credentials: true,
    }),
  );
  app.use(
    session({
      secret: config.get<string>('session.secret'),
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      },
    }),
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
};

export default loadMiddlewares;
