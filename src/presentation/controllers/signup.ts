import { MissingParameterError } from "../errors/missing-params-error"
import { HttpResponse, HttpRequest } from "../protocols/https"

export class SignUpController {
  handle(httpResponse: HttpRequest): HttpResponse {
    if (!httpResponse.body.name) {
      return { statusCode: 400, body: new MissingParameterError('name') }
    }
    if (!httpResponse.body.email) {
      return { statusCode: 400, body: new MissingParameterError('email') }
    }
  }
}
