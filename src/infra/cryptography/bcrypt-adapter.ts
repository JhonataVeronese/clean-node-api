import bcrypt from 'bcrypt'
import { Encryptor } from "../../data/protocols/encryptor";

export class BcryptAdapter implements Encryptor {
  private readonly salt: number;
  constructor(salt: number) { this.salt = salt; }

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return null;
  }
}