import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRoutes, BASE_URL } from '../api/api.routes'
import { User, UserResponse } from '../api/api.types'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['User'],
	endpoints: builder => ({
		getUsers: builder.query<User[], void>({
			query: () => ApiRoutes.USERS,
			providesTags: ['User'],
			transformResponse: (response: UserResponse) => response.data,
		}),
	}),
})

export const { useGetUsersQuery } = usersApi
