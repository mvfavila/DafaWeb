import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './login/login';

export class Token {
    token: string = null;

    decode(): Login {
        // TODO: throw exception if token does not exist

        const decodedToken = new JwtHelperService().decodeToken(this.token);
        const login = new Login();
        login.email = decodedToken.email;
        login.username = decodedToken.username;
        login.roles = decodedToken.roles;
        login.token = this.token;

        return login;
    }

    isExpired() {
        if (!this.token) { return true; }

        return new JwtHelperService().isTokenExpired(this.token);
    }
}
