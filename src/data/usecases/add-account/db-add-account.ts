import { Account } from "../../../domain/models/account";
import { AddAccountModel, IAddAccount } from "../../../domain/usecases/add-account-use-case";
import { Encryptor } from "../../protocols/encryptor";

export class DbAddAccount implements IAddAccount {
  private readonly encryptor: Encryptor;
  constructor(encryptor: Encryptor) { this.encryptor = encryptor; }

  async add(account: AddAccountModel): Promise<Account> {
    await this.encryptor.encrypt(account.password);
    return Promise.resolve(null);
  }
}