import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const createCatSchema = z.object({
  name: z.string(),
  age: z.coerce.number().int().min(0),
  breed: z.string().optional(),
})

export class CreateCatDto extends createZodDto(createCatSchema) {}
