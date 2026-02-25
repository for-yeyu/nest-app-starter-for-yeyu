import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const appName = this.configService.get('APP_NAME')

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
