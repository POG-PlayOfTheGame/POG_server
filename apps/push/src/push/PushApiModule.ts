import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonLogger } from '@app/common-config/getWinstonLogger';
import { PushApiController } from './PushApiController';
import { PushApiService } from './PushApiService';
import { getBullQueue } from '../../../../libs/entity/queue/getBullQueue';
import { PushApiConsumer } from './PushApiConsumer';
import { getCacheModule } from '../../../../libs/entity/geCacheModule';

@Module({
  imports: [
    WinstonModule.forRoot(getWinstonLogger(process.env.NODE_ENV, 'push')),
    getBullQueue(),
    getCacheModule(),
  ],
  controllers: [PushApiController],
  providers: [PushApiService, PushApiConsumer],
  exports: [getBullQueue(), getCacheModule()],
})
export class PushApiModule {}
