export type User = {
  id: string;
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
  userEntity?: Omit<Partial<User>, 'id' | 'createdOn' | 'updatedOn'>;
}
export type EditUserStateType = {
  userId: User['id']
  userEntity?: Omit<Partial<User>, 'id'>;
}

export type DeleteUserStateType = {
  userId: User['id']
}
