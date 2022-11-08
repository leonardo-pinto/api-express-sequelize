export class ApiError extends Error {
  statusCode: number
  errors: string[] = []
  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message)
    this.statusCode = statusCode

    if (errors) {
      this.errors = errors
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(400, message, errors)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(401, message, errors)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(403, message, errors)
  }
}