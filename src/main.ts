import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ZodValidationPipe } from 'nestjs-zod'
import { AppModule } from './app.module'
import { EnvService } from './config/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn'],
  })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ZodValidationPipe())

  const envService = app.get(EnvService)
  const port = envService.serverPort
  const nodeEnv = envService.nodeEnv

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'localhost')
    .addTag('cats')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  })

  await app.listen(port, () => {
    // biome-ignore lint/suspicious/noConsole: <ignore empty>
    console.log(``)
    // biome-ignore lint/suspicious/noConsole: <ignore>
    console.log(`🥳 Nest app is running on http://localhost:${port}/api`)
    // biome-ignore lint/suspicious/noConsole: <ignore>
    console.log(`🤩 Swagger is running on http://localhost:${port}/docs`)
    // biome-ignore lint/suspicious/noConsole: <ignore>
    console.log(`🤓 Current env is ${nodeEnv}`)
  })
}

bootstrap()
