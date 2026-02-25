import { Injectable } from '@nestjs/common'
import { EnvService } from './config/env/env.service'

@Injectable()
export class AppService {
  constructor(private readonly envService: EnvService) {}

  getHello(): string {
    const appName = this.envService.appName

    return `
      <h1
        style="
          margin: 0;
          margin-bottom: 12px;
          font-size: 28px;
          font-weight: 600;
          color: #212529;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.3px;
        "
      >
        Hello~ <br />
        Your app name is "${appName}" in .env. Do NOT commit .env to public repositories!
      </h1>
    `
  }
}
