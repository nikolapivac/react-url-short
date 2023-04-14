export class DeleteUrlApi {
  static readonly BASE_URL = process.env.BASE_URL;

  async deleteUrl(code: string) {
    const token = localStorage.getItem('accessToken');
    await fetch(`http://localhost:5001/url/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
