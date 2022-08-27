import { InvalidParameterError, MissingParameterError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import { IEmailValidator } from "../protocols/email-validation";
import { IController, HttpResponse, HttpRequest } from "../protocols"
export class SignUpController implements IController {
  private readonly emailValidation: IEmailValidator;
  constructor(emailValidation: IEmailValidator) {
    this.emailValidation = emailValidation
  }
  handle(httpResponse: HttpRequest): HttpResponse {
    try {
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
    } catch (error) {
      return serverError();
    }
  }
}
