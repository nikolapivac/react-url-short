import { CreateAccountDto } from './dto/create-account.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';

export class AuthApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async signUp(data: CreateAccountDto) {
    const { firstName, lastName, email, username, password } = data;
    const response = await fetch(`${this.BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, username, password }),
    });

    const json = (await response.json()) as SignUpResponseDto;
    return json;
  }

  async signIn(data: SignInDto) {
    const { username, password } = data;
    const response = await fetch(`${this.BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const json = (await response.json()) as SignInResponseDto;
    return json;
  }
}
