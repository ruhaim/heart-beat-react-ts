export type User = {
  id: number,
  name: string,
  email: string,
  gender: 'male' | 'female'
  dob: string,
  city: string
  mobile: string
  createdOn: string,
  updatedOn: string,
}

export type UserListResponse = {
  users: User[]
}