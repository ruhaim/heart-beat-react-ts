import { apiSlice } from "../../store/apiSlice";

import type { User, UserListResponse } from "./userTypes";

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] })

const userApi = apiWithTags.injectEndpoints({
  overrideExisting: false,


  endpoints: (build) => ({
    getUsers: build.query<UserListResponse, void>({
      query: () => ({ url: "users" }),
      providesTags: ['User']
    }),
    createUser: build.mutation<
      User,
      Partial<Omit<User, "id" | "createdOn" | "updateOn">>
    >({
      query: ({ ...patch }) => ({
        url: `users`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: ['User']

    }),
    updateUser: build.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: build.mutation<string, Pick<User, "id">>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['User']
    }),
  }),
});

export default userApi;
