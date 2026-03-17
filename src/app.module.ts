import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { LoggerModule } from 'nestjs-pino'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envConfig } from './config/env/env.config'
import { EnvModule } from './config/env/env.module'
import { pinoHttp } from './config/log/pino.config'
import { CatModule } from './module/cat/cat.module'

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    LoggerModule.forRoot({
      pinoHttp,
    }),
    EnvModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
