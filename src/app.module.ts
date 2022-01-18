import { ExceptionModule } from './common/exceptions/exception.module';
import { LoggingModule } from './common/logging/logging.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [LoggingModule, ExceptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
