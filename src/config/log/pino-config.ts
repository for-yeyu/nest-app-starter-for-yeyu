import type { Params } from 'nestjs-pino/params'

export const pinoHttp: Params['pinoHttp'] = {
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      {
        target: 'pino/file',
        options: {
          destination: './logs/app.log',
          mkdir: true,
        },
      },
    ],
  },
}
