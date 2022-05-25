export interface AuthState {
  auth: {
    isLoggingIn: Boolean;
    jwt: string;
    isRegistering: Boolean;
    loginErrorMessage: string;
    registerErrorMessasge: string;
  };
}
