import { apiSlice } from '../../store/apiSlice';
import type {User} from './userTypes'

const userApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({ url: "user" })
    }),
    createUser: build.mutation<User, Omit<User, 'id' | 'createdOn' | 'updateOn'>>({
      query: ({ ...patch }) => ({
        url: `user`,
        method: 'POST',
        body: patch,
      }),
    }),
    updateUser: build.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `user/${id}`,
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