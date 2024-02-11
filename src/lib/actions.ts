'use server'

import { RequestFormValues, RequestHeader } from './definitions'

export async function getTypes(data: RequestFormValues) {
  // setting headers
  const headers = new Headers()
  data.headers.forEach((header: RequestHeader) => {
    if (header.name === '' || header.value === '') return
    headers.append(header.name, header.value)
  })

  // sending request
  try {
    const response = await fetch(data.url, {
      body: JSON.stringify(data.body),
      method: data.type,
      headers
    })

    const responseJson = await response.json()

    const keys = Object.keys(responseJson)
    const values = Object.values(responseJson)

    const types = values.map((value) => typeof value)

    let result = `type ${data.name} = {`

    values.forEach((_, index) => {
      const toAdd = `\n  ${keys[index]}: ${types[index]}`
      result += toAdd
    })

    result += '\n}'

    return result
  } catch (error) {
    return 'Something is wrong, please try again later'
  }
}
