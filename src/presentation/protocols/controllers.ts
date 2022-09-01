import { HttpRequest, HttpResponse } from "./https";

export interface IController {
  handle(httpResponse: HttpRequest): Promise<HttpResponse>
}