import { ConfigModuleOptions } from '@nestjs/config'
import { validateEnv } from './env.validation'

const nodeEnv = process.env.NodeEnv ?? 'development'

export const envConfig: ConfigModuleOptions['validationOptions'] = {
  isGlobal: true,
  cache: true,
  expandVariables: true,
  envFilePath: [`.env.${nodeEnv}.local`, `.env.${nodeEnv}`, '.env.local', '.env'],
  validate: validateEnv,
}
