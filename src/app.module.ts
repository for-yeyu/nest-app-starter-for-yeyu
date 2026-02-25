import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvService } from './config/env/env.service'
import { validateEnv } from './config/env/env.validation'

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
  ],
  controllers: [AppController],
  providers: [AppService, EnvService],
})
export class AppModule {}
