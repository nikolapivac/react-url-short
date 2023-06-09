export class DeleteUrlApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async deleteUrl(code: string) {
    const token = localStorage.getItem('accessToken');
    await fetch(`${this.BASE_URL}/url/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
