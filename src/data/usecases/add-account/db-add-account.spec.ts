import { Encryptor } from "../../protocols/encryptor";
import { DbAddAccount } from "./db-add-account";

describe('DbAddAccount UseCase', () => {
  test('Should call encrypted with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSyp = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData);
    expect(encryptSyp).toHaveBeenCalledWith('valid_password');

  })

  interface SutTypes {
    sut: DbAddAccount;
    encrypterStub: Encryptor
  }

  const makeEncrypter = (): Encryptor => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hash_value');
      }
    }

    return new EncrypterStub();
  }

  const makeSut = (): SutTypes => {

    const encrypterStub = makeEncrypter();
    const sut = new DbAddAccount(encrypterStub);

    return { sut, encrypterStub }
  }
})