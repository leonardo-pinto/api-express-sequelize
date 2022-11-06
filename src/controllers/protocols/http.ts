import { UnauthorizedError } from "../errors/unauthorized-error"

export type HttpResponse = {
  statusCode: number
  body: any
}

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})