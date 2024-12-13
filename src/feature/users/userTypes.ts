export type User = {
  id: number,
  name: string,
  email: string,
  gender: 'male' | 'female'
  dob: Date,
  city: string
  mobile: string
  createdOn: Date,
  updatedOn: Date,
}

export type UserListResponse = {
  users: User[]
}