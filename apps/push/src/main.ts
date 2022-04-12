import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { PushAppModule } from './PushAppModule';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { SetNestApp } from '@app/common-config/setNestApp';

class Application {
  private logger = new Logger(Application.name);
  private PORT: string;
  private DEV_MODE: boolean;

  constructor(private server: NestExpressApplication) {
    this.server = server;
    this.PORT = process.env.PUSH_PORT;
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
  }

  async bootstrap() {
    SetNestApp(this.server);
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }
}

async function bootstrap(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(
    PushAppModule,
    {
      logger: WinstonModule.createLogger({
        transports: [
          new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike('PushApp', {
                prettyPrint: true,
              }),
            ),
          }),
        ],
      }),
    },
  );

  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

bootstrap().catch(error => {
  new Logger('init').error(error);
});
