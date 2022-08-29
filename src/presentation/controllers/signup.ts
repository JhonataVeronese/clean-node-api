import { InvalidParamError, MissingParameterError } from "../errors";
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
      const { email, password, passwordConfirmation } = httpResponse.body;
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpResponse.body[field]) {
          return badRequest(new MissingParameterError(field));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidation.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
