import { User } from "./user";

export class ResponseData {
  requestType: number;
  message: string;
  entityId: number;
  userData: User;
  productData: any;
  isValid: boolean;
}

export enum RequestType {
  POST,
  PUT,
  DELETE
}
