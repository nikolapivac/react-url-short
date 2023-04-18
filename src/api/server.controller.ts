import { AuthApi } from './auth.api';
import { DeleteUrlApi } from './delete-url-api';
import { DeleteUserApi } from './delete-user-api';
import { GetUrlsApi } from './get-urls.api';
import { UrlShortenerApi } from './url-shortener.api';
import { VerifyEmailApi } from './verify-email-api';

export class ServerController {
  static UrlShortener = new UrlShortenerApi();
  static Authentication = new AuthApi();
  static DeleteUrl = new DeleteUrlApi();
  static GetAllUrls = new GetUrlsApi();
  static VerifyEmail = new VerifyEmailApi();
  static DeleteUser = new DeleteUserApi();
}
