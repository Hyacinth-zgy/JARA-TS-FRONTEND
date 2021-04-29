export interface User {
  id: number;
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

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
