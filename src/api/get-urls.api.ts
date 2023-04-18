import { GetUrlsResponseDto } from './dto/get-urls-response.dto';

export class GetUrlsApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async getUrls() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${this.BASE_URL}/url`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = (await response.json()) as GetUrlsResponseDto[];
    return json;
  }
}
