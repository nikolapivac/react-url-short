import { CreateUrlResponseDto } from './dto/create-url-response.dto';

export class UrlShortenerApi {
  static readonly BASE_URL = process.env.BASE_URL;

  async getUrlShort(longUrl: string) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:5001/url/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ longUrl }),
    });
    const json = (await response.json()) as CreateUrlResponseDto;
    return json;
  }
}
