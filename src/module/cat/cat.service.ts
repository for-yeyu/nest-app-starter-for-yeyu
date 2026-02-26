import type { CreateCatDto } from './dto/create-cat.dto'
import type { UpdateCatDto } from './dto/update-cat.dto'
import type { Cat } from './entity/cat.entity'
import { Injectable, NotFoundException } from '@nestjs/common'
import { EnvService } from 'src/config/env/env.service'

@Injectable()
export class CatService {
  private cats: Cat[] = []
  private nextId = 1

  constructor(private readonly envService: EnvService) {}

  create(createCatDto: CreateCatDto): Cat {
    const cat: Cat = {
      id: this.nextId++,
      ...createCatDto,
    }

    this.cats.push(cat)
    return cat
  }

  findAll(): Cat[] {
    console.log(this.envService.appName)
    return this.cats
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(item => item.id === id)

    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`)
    }

    return cat
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const cat = this.findOne(id)
    const updated = { ...cat, ...updateCatDto }
    this.cats = this.cats.map(item => (item.id === id ? updated : item))

    return updated
  }

  remove(id: number): Cat {
    const cat = this.findOne(id)
    this.cats = this.cats.filter(item => item.id !== id)
    return cat
  }
}
