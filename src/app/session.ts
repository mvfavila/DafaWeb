export class UserSession {
    username: string;
    email: string;
    token: string;
    role: [];

    public exists(): boolean {
        return !!this.email;
    }
}
