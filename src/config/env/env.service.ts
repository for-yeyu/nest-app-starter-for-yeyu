import type { Env } from './env.schema'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  get<K extends keyof Env>(key: K): Env[K] {
    return this.configService.getOrThrow(key, { infer: true })
  }

  get nodeEnv(): Env['NodeEnv'] {
    return this.get('NodeEnv')
  }

  get appName(): Env['AppName'] {
    return this.get('AppName')
  }

  get serverPort(): Env['ServerPort'] {
    return this.get('ServerPort')
  }
}
