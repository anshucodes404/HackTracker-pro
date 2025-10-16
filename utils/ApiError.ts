class ApiError extends Error {
  status: number;
  message: string;
  error: unknown;
  constructor(
    status: number,
    message: string = "Something went wrong",
    error?: unknown
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

export { ApiError };
