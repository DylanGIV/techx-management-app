export interface AuthState {
    auth: {
        isLoggingIn: Boolean;
        jwt: string;
    };
}   