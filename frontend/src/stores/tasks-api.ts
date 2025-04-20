import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRoutes, BASE_URL } from '../api/api.routes'
import {
	AddTaskRequest,
	BoardIdResponse,
	Task,
	TasksResponse,
	UpdateTaskRequest,
} from '../api/api.types'

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Tasks'],
	endpoints: builder => ({
		getTasks: builder.query<Task[], void>({
			query: () => ApiRoutes.TASKS,
			providesTags: ['Tasks'],
			transformResponse: (response: TasksResponse) => response.data,
		}),
		createTask: builder.mutation<Task, AddTaskRequest>({
			query: newTask => ({
				url: `${ApiRoutes.TASKS}/create`,
				method: 'POST',
				body: newTask,
			}),

			invalidatesTags: ['Tasks'],
		}),
		updateTask: builder.mutation<Task, UpdateTaskRequest & { id: number }>({
			query: updatedTask => ({
				url: `${ApiRoutes.TASKS}/update/${updatedTask.id}`,
				method: 'PUT',
				body: updatedTask,
			}),
			invalidatesTags: ['Tasks'],
		}),
		getTasksByBoardId: builder.query<Task[], string>({
			query: id => `${ApiRoutes.BOARDS}/${id}`,
			providesTags: ['Tasks'],
			transformResponse: (response: BoardIdResponse) => response.data,
		}),
	}),
})

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useGetTasksByBoardIdQuery,
} = tasksApi
