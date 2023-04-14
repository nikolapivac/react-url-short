import { AuthApi } from './auth.api';
import { DeleteUrlApi } from './delete-url-api';
import { GetUrlsApi } from './get-urls.api';
import { UrlShortenerApi } from './url-shortener.api';

export class ServerController {
  static UrlShortener = new UrlShortenerApi();
  static Authentication = new AuthApi();
  static DeleteUrl = new DeleteUrlApi();
  static GetAllUrls = new GetUrlsApi();
}
