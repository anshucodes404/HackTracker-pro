class ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;

  constructor(
    success: boolean,
    msg: string,
    data?: unknown,
    err?: unknown,
  ) {
    this.success = success;
    this.message = `${msg}${err ? `, ${err}` : ""}`
    this.data = data;
  }
}

export { ApiResponse };
