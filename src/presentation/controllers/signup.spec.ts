import { MissingParameterError } from "../errors/missing-params-error";
import { SignUpController } from "./signup";

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError('password_confirmation'));
  });
})

const makeSut = () => {
  return new SignUpController();
}
