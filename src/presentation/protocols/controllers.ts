import { HttpRequest, HttpResponse } from "./https";

export interface IController {
  handle(httpResponse: HttpRequest): HttpResponse
}