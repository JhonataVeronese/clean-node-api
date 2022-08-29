import { InvalidParamError, MissingParameterError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import { IEmailValidator } from "../protocols/email-validation";
import { IController, HttpResponse, HttpRequest } from "../protocols"
import { IAddAccount } from "../../domain/usecase/add-account-use-case";
export class SignUpController implements IController {
  private readonly emailValidation: IEmailValidator;
  private readonly addAccount: IAddAccount;

  constructor(emailValidation: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidation = emailValidation
    this.addAccount = addAccount
  }
  handle(httpResponse: HttpRequest): HttpResponse {
    try {
      const { name, email, password, passwordConfirmation } = httpResponse.body;
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

      this.addAccount.add({ name, email, password, });

    } catch (error) {
      return serverError();
    }
  }
}
