import { Module } from '@nestjs/common'
import { EnvModule } from 'src/config/env/env.module'
import { CatController } from './cat.controller'
import { CatService } from './cat.service'

@Module({
  imports: [EnvModule],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
