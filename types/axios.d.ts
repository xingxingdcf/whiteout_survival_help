export interface Result<T = any> {
   code: number;
   err_code: number;
   msg: string;
   data: T;
}
