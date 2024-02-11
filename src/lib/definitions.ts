import { z } from 'zod'

const RequestTypeSchema = z.union([
  z.literal('GET'),
  z.literal('POST'),
  z.literal('PUT'),
  z.literal('PATCH'),
  z.literal('DELETE')
])

const HeaderTypeSchema = z.object({
  value: z.string(),
  name: z.string()
})

export const requestSchema = z.object({
  name: z.string().min(1, 'name is required'),
  headers: HeaderTypeSchema.array(),
  body: z.string().optional(),
  type: RequestTypeSchema,
  url: z.string().url()
})

export type RequestHeader = z.infer<typeof HeaderTypeSchema>

export type RequestFormValues = z.infer<typeof requestSchema>
