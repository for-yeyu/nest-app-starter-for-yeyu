import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvModule } from './config/env/env.module'
import { validateEnv } from './config/env/env.validation'
import { pinoHttp } from './config/log/pino-config'
import { CatModule } from './module/cat/cat.module'

const nodeEnv = process.env.NodeEnv ?? 'development'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: [`.env.${nodeEnv}.local`, `.env.${nodeEnv}`, '.env.local', '.env'],
      validate: validateEnv,
    }),
    LoggerModule.forRoot({
      pinoHttp,
    }),
    EnvModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
