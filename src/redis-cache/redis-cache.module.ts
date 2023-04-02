import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports:[
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>({
                store: redisStore,
                host: configService.get("REDIS_HOST"),
                port: configService.get("REDIS_PORT"),
                // username: configService.get("REDIS_USERNAME"),
                // password: configService.get("REDIS_PASSWORD"),
                ttl: 1000
                // ttl: configService.get("REDIS_TTL") //제한시간
            }),
            isGlobal:true
        })
    ]
})
export class RedisCacheModule {}