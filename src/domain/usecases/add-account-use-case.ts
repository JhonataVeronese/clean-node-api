import { Account } from "../models/account"

export interface IAddAccount {
  add(account: AddAccountModel): Account
}

export interface AddAccountModel {
  name: string,
  email: string,
  password: string
}