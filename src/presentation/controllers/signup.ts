import { HttpResponse, HttpRequest } from "../protocols/https"

export class SignUpController {
  handle(httpResponse: HttpRequest): HttpResponse {
    if (!httpResponse.body.name) {
      return { statusCode: 400, body: new Error('Missing param: name') }
    }
    if (!httpResponse.body.email) {
      return { statusCode: 400, body: new Error('Missing param: email') }
    }
  }
}
