import { EmailValidationAdapter } from "./email-validator";

describe('EmailValidation Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidationAdapter();
    const isValid = sut.isValid('invalid@email.com');
    expect(isValid).toBe(false)
  })
})