export class DeleteUserApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async deleteUser(token: string | null) {
    await fetch(`${this.BASE_URL}/auth/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
