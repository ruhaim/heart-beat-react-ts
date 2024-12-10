import { apiSlice } from '../../store/apiSlice';
import type {User, UserListResponse} from './userTypes'

const userApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUsers: build.query<UserListResponse, void>({
      query: () => ({ url: "users" })
    }),
    createUser: build.mutation<User, Omit<User, 'id' | 'createdOn' | 'updateOn'>>({
      query: ({ ...patch }) => ({
        url: `users`,
        method: 'POST',
        body: patch,
      }),
    }),
    updateUser: build.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteUser: build.mutation<string, Pick<User, 'id'>>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
})

export default userApi;