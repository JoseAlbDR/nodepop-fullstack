export class CustomAPIError extends Error {
  constructor(
    public name: string,
    public message: string,
    public statusCode: number
  ) {
    super(message);
  }
}
