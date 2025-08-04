import { ApiErrorResponse } from "../types";

export function isApiErrorResponse(obj: any): obj is ApiErrorResponse {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.timestamp === "string" &&
    typeof obj.status === "number" &&
    typeof obj.error === "string" &&
    typeof obj.message === "string" &&
    typeof obj.path === "string" 
  );
}