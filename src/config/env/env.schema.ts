import { z } from 'zod'

export const envSchema = z.object({
  NodeEnv: z.enum(['development', 'test', 'production']).default('development'),

  AppName: z.string().trim().min(1).default('Nest App Starter For yeyu'),

  ServerPort: z.coerce.number().int().min(1).max(65535).default(4040),
})

export type Env = z.infer<typeof envSchema>
