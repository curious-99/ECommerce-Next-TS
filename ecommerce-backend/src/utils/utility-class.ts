class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;