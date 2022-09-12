import { DbAddAccount } from "./db-add-account";

describe('DbAddAccount UseCase', () => {
  test('Should call encrypted with correct password', async () => {

    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return Promise.resolve('hash_value');
      }
    }

    const encrypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encrypterStub);
    const encryptSyp = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData);
    expect(encryptSyp).toHaveBeenCalledWith('valid_password');

  })

})