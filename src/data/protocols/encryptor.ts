export interface Encryptor {
  encrypt(value: string): Promise<string>;
}