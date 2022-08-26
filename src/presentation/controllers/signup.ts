import { MissingParameterError } from "../errors/missing-params-error"
import { IController } from "../helpers/controllers";
import { badRequest } from "../helpers/http-helper";
import { HttpResponse, HttpRequest } from "../protocols/https"
export class SignUpController implements IController {
  handle(httpResponse: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'password_confirmation'];
    for (const field of requiredFields) {
      if (!httpResponse.body[field]) {
        return badRequest(new MissingParameterError(field));
      }
    }
  }
}
