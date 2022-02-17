/**
 * Generic error class
 */
export class APIError extends Error {
  code: number;

  constructor(code?: number, message?: string) {
    super(message);
    this.code = code || 500;
    this.name = this.constructor.name;
  }
}

export class ValidationError extends APIError {}
export class UnknownResourceError extends APIError {}
export class AuthorizationError extends APIError {}
