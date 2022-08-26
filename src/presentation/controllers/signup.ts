import { MissingParameterError } from "../errors/missing-params-error"
import { badRequest } from "../helpers/http-helper";
import { HttpResponse, HttpRequest } from "../protocols/https"

export class SignUpController {
  handle(httpResponse: HttpRequest): HttpResponse {
    if (!httpResponse.body.name) {
      return badRequest(new MissingParameterError('name'));
    }
    if (!httpResponse.body.email) {
      return badRequest(new MissingParameterError('email'));
    }
  }
}
