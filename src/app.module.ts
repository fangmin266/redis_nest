import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LibraryModule } from './library/library.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import * as Joi from "@hapi/joi";
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),

    ConfigModule.forRoot({
      validationSchema: Joi.object(({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT:Joi.number().required(),
        REDIS_TTL: Joi.number().required(), //제한시간

        LIBRARY_ADDRESS: Joi.string().required()

      }))
    }),
    DatabaseModule,
    LibraryModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
