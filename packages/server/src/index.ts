import 'reflect-metadata';
import * as express from 'express';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

import { config } from './ormconfig';

import { schema } from './schema';
import { initGoogleClient } from './googleClient';

dotenv.config();

const startServer = async (): Promise<void> => {
  const connection = await createConnection(config as any);

  const client = initGoogleClient();

  if (connection) {
    console.log('Established connection');
  }

  const app = express();

  app.use(
    session({
      name: 'access_token',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const server = new ApolloServer({
    schema: await schema,
    context: ({ req }: { req: Request }) => ({ req, client })
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

try {
  startServer();
} catch (e) {
  console.error(e);
}