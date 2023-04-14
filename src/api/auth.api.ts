import { CreateAccountDto } from './dto/create-account.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';

export class AuthApi {
  static readonly BASE_URL = process.env.BASE_URL;

  async signUp(data: CreateAccountDto) {
    const { username, password } = data;
    const response = await fetch('http://localhost:5001/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const json = (await response.json()) as SignUpResponseDto;
    return json;
  }

  async signIn(data: SignInDto) {
    const { username, password } = data;
    const response = await fetch('http://localhost:5001/auth/signin', {
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
