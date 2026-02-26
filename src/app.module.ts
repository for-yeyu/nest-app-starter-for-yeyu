import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvModule } from './config/env/env.module'
import { validateEnv } from './config/env/env.validation'
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
    EnvModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
