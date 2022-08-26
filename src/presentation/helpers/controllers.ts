import { HttpRequest, HttpResponse } from "../protocols/https";

export interface IController {
  handle(httpResponse: HttpRequest): HttpResponse
}