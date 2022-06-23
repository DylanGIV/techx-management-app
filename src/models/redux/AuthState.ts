import { Account } from "../response/AccountResponse";

export interface AuthState {
  auth: {
    isLoggingIn: Boolean;
    jwt: string;
    isRegistering: Boolean;
    loginErrorMessage: string;
    registerErrorMessasge: string;
    role: string;
    account: Account;

    // add password reset?
    
  };
}
