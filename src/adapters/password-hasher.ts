import { hash } from 'bcryptjs';

export class PasswordHasherAdapter {
  hash(password) {
    return hash(password, 12);
  }
}
