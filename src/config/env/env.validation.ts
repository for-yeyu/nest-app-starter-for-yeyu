import type { Env } from './env.schema'
import { envSchema } from './env.schema'

export function validateEnv(config: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(config)

  if (parsed.success) {
    return parsed.data
  }

  const issues = parsed.error.issues
    .map(issue => {
      const path = issue.path.length > 0 ? issue.path.join('.') : '(root)'
      return `${path}: ${issue.message}`
    })
    .join('\n')

  throw new Error(`Environment validation failed:\n${issues}`)
}
