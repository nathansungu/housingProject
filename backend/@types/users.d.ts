export type UpdateProfileInput = {
    userId: string;
    firstName?: string | null;
    lastName?: string | null;
    imgUrl?: string | null;
};

export type RegisterUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
};