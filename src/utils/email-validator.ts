import validator from "validator";
import { IEmailValidator } from "../presentation/protocols/email-validation";
export class EmailValidationAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}