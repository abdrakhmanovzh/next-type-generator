'use client'

import { RequestFormValues, requestSchema } from '@/lib/definitions'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Minus, Plus } from 'lucide-react'
import { getTypes } from '@/lib/actions'
import { useState } from 'react'

import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from './ui/select'
import { FormControl, FormMessage, FormField, FormLabel, FormItem, Form } from './ui/form'
import { CodeResult } from './code-result'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function RequestForm() {
  const [result, setResult] = useState<string>('')

  const form = useForm<RequestFormValues>({
    defaultValues: {
      type: 'GET',
      name: '',
      url: ''
    },
    resolver: zodResolver(requestSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'headers'
  })

  async function onSubmit(data: RequestFormValues) {
    const res = await getTypes({
      body: data.body ? JSON.parse(data.body as string) : undefined,
      headers: data.headers,
      type: data.type,
      name: data.name,
      url: data.url
    })
    setResult(res)
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full max-w-3xl flex-col items-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-4">
            <h2 className="text-lg font-medium">type name</h2>
            <FormField
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="example: PostType" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="name"
            />
          </div>

          <div className="flex w-full flex-col gap-4">
            <h2 className="text-lg font-medium">request info</h2>
            <div className="flex w-full gap-4">
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="REQ TYPE" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                control={form.control}
                name="type"
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="your endpoint url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                control={form.control}
                name="url"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-medium">headers</h2>
            <Button
              onClick={() =>
                append({
                  value: '',
                  name: ''
                })
              }
              type="button"
              size={'icon'}
            >
              <Plus size={20} />
            </Button>
          </div>

          {fields.map((_, index) => (
            <div className="flex w-full items-end gap-4" key={index}>
              <div className="flex-1 space-y-2">
                <FormField
                  render={({ field }) => (
                    <FormItem className="flex-shrink">
                      <FormLabel htmlFor="header-name">Header Name</FormLabel>
                      <FormControl>
                        <Input placeholder="example: Content-Type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={`headers.${index}.name`}
                  control={form.control}
                />
              </div>
              <div className="flex-1 space-y-2">
                <FormField
                  render={({ field }) => (
                    <FormItem className="flex-shrink">
                      <FormLabel htmlFor="header-value">Header Value</FormLabel>
                      <FormControl>
                        <Input placeholder="example: application/json" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={`headers.${index}.value`}
                  control={form.control}
                />
              </div>
              <Button onClick={() => remove(index)} type="button" size={'icon'}>
                <Minus size={20} />
              </Button>
            </div>
          ))}

          <div className="flex w-full flex-col gap-4">
            <h2 className="text-lg font-medium">body</h2>
            <FormField
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea placeholder="request body" className="h-64" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              control={form.control}
              name="body"
            />
          </div>

          <Button className="text-base" type="submit">
            submit
          </Button>
        </form>
      </Form>

      {result.length > 0 && <CodeResult code={result} />}
    </>
  )
}
