import { environment } from "../environments/environment";

const API_URL = environment.apiUrl;

export class Routes {
  public signIn(): string {
    return API_URL + "/users/login";
  }
}
