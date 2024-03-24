import { hash } from 'bcryptjs';

interface IPasswordHasherAdapter {
  hash(password: string);
}

export class PasswordHasherAdapter implements IPasswordHasherAdapter {
  hash(password) {
    return hash(password, 12);
  }
}
