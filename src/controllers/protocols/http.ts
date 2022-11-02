/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpResponse = {
  statusCode: number
  body: any
}

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})