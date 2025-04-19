import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRoutes, BASE_URL } from '../api/api.routes'
import { Board, BoardResponse } from '../api/api.types'

export const boardsApi = createApi({
	reducerPath: 'boardsApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Board'],
	endpoints: builder => ({
		getBoards: builder.query<Board[], void>({
			query: () => ApiRoutes.BOARDS,
			providesTags: ['Board'],
			transformResponse: (response: BoardResponse) => response.data,
		}),
	}),
})

export const { useGetBoardsQuery } = boardsApi
