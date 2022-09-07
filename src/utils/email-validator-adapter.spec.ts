import { EmailValidationAdapter } from "./email-validator";
import validator from "validator";

jest.mock('validator', () => ({
  isEmail(): boolean { return true }
}))

describe('EmailValidation Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidationAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid@email');
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = new EmailValidationAdapter();
    const isValid = sut.isValid('valid@email.com');
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = new EmailValidationAdapter();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');

    const isValid = sut.isValid('any_valid@email.com');
    expect(isEmailSpy).toHaveBeenCalledWith('any_valid@email.com')
  })
})