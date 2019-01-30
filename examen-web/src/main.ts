import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as FileSession from 'session-file-store';

const FileStore = FileSession(session);



async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  app.use(
      session({
        secret: 'No sera de tomar un traguito',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
        name: 'server-session-id',
        store: new FileStore()
      })
  )
  await app.listen(3000);
}
bootstrap();
