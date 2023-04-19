export class ResendEmailApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async resendEmail(
    email: string | undefined
  ): Promise<{ message: string; statusCode: number }> {
    const response = await fetch(`${this.BASE_URL}/auth/resend/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return json;
  }
}
