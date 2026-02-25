import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn'],
  })

  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('SERVER_PORT', 4040)

  await app.listen(PORT, () => {
    // biome-ignore lint/suspicious/noConsole: <ingore>
    console.log(`Nest app is running on http://localhost:${PORT}/api`)
  })
}

bootstrap()
