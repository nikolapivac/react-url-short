import { GetUrlsResponseDto } from './dto/get-urls-response.dto';

export class GetUrlsApi {
  static readonly BASE_URL = process.env.BASE_URL;

  async getUrls() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:5001/url`, {
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
