export interface ServiceResponse<T> {
  isSuccess: boolean;
  data?: T;
  error?: string | { code: string; message: string };
}
