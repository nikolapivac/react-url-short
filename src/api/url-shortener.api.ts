import { CreateUrlResponseDto } from './dto/create-url-response.dto';

export class UrlShortenerApi {
  readonly BASE_URL = process.env.REACT_APP_BASE_URL;

  async getUrlShort(longUrl: string) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${this.BASE_URL}/url/shorten`, {
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
