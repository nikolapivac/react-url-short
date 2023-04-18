export class VerifyEmailApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async verify(code: string | undefined) {
    const response = await fetch(`${this.BASE_URL}/auth/verify/${code}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();
    return json;
  }
}
