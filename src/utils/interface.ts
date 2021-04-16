export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface loginParam {
  username: string;
  password: string;
}

export interface AuthForm {
  username: string;
  password: string;
}
