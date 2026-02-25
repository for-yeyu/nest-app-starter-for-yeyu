import { createZodDto } from 'nestjs-zod'
import { createCatSchema } from './create-cat.dto'

export const updateCatSchema = createCatSchema.partial()

export class UpdateCatDto extends createZodDto(updateCatSchema) {}
