class ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;

  constructor(
    success: boolean,
    msg: string,
    err?: string,
    data?: unknown
  ) {
    this.success = success;
    this.message = `${msg}${err ? `, ${err}` : ""}`
    this.data = data;
  }
}

export { ApiResponse };
