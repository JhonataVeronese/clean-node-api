import { InvalidParameterError } from "../errors/invalid-params-error";
import { MissingParameterError } from "../errors/missing-params-error";
import { IEmailValidator } from "../protocols/email-validation";
import { SignUpController } from "./signup";

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('password'));
  });

  test('Should return 400 if no password_confirmation is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('passwordConfirmation'));
  });

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidationStub } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    jest.spyOn(emailValidationStub, 'isValid').mockReturnValueOnce(false);


    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParameterError('email'));
  });
})

interface SutTypes {
  sut: SignUpController, emailValidationStub: IEmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidationStub implements IEmailValidator {
    isValid(email: string): boolean { return true }
  }
  const emailValidationStub = new EmailValidationStub();
  const sut = new SignUpController(emailValidationStub);
  return { sut, emailValidationStub };
}
