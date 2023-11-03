export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserLogin = Omit<UserRegister, "firstName" | "lastName">;
