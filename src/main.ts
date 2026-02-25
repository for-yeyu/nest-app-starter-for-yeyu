import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { EnvService } from './config/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn'],
  })

  app.setGlobalPrefix('api')

  const envService = app.get(EnvService)
  const port = envService.serverPort
  const nodeEnv = envService.nodeEnv

  await app.listen(port, () => {
    // biome-ignore lint/suspicious/noConsole: <ignore>
    console.log(`🥳 Nest app is running on http://localhost:${port}/api`)
    // biome-ignore lint/suspicious/noConsole: <ignore>
    console.log(`🤓 Current env is ${nodeEnv}`)
  })
}

bootstrap()
