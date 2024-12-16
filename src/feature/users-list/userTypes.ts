export type User = {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female";
  dob: string;
  city: string;
  mobile: string;
  createdOn: string;
  updatedOn: string;
};

export type UserListResponse = {
  users: User[];
};

export type CreateUserStateType = {
  userEntity?: Omit<Partial<User>, 'id'>;
}
export type EditUserStateType = {
  userId: number
  userEntity?: Omit<Partial<User>, 'id'>;
}

export type DeleteUserStateType = {
  userId: number
}
