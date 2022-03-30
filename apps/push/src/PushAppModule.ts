import { HealthCheckController } from './health-check/HealthCheckController';
import { getTypeOrmModule } from '../../../libs/entity/getTypeOrmModule';
import { LoggingModule } from '@app/common-config/logging/logging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { AuthConfig, ValidationSchema } from '@app/common-config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AuthConfig],
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    getTypeOrmModule(),
    LoggingModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthCheckController],
})
export class PushAppModule {}
