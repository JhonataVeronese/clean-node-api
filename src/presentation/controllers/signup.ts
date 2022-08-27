import { InvalidParameterError } from "../errors/invalid-params-error";
import { MissingParameterError } from "../errors/missing-params-error"
import { IController } from "../helpers/controllers";
import { badRequest } from "../helpers/http-helper";
import { IEmailValidator } from "../protocols/email-validation";
import { HttpResponse, HttpRequest } from "../protocols/https"
export class SignUpController implements IController {
  private readonly emailValidation: IEmailValidator;
  constructor(emailValidation: IEmailValidator) {
    this.emailValidation = emailValidation
  }
  handle(httpResponse: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const field of requiredFields) {
      if (!httpResponse.body[field]) {
        return badRequest(new MissingParameterError(field));
      }
    }
    const isValid = this.emailValidation.isValid(httpResponse.body.email);
    if (!isValid) {
      return badRequest(new InvalidParameterError('email'));
    }

  }
}
