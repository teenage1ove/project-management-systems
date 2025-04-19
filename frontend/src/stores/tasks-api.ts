import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRoutes, BASE_URL } from '../api/api.routes'
import { Task, TasksResponse } from '../api/api.types'

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Task'],
	endpoints: builder => ({
		getTasks: builder.query<Task[], void>({
			query: () => ApiRoutes.TASKS,
			providesTags: ['Task'],
			transformResponse: (response: TasksResponse) => response.data,
		}),
		createTask: builder.mutation<Task, Omit<Task, 'id'>>({
			query: newTask => ({
				url: ApiRoutes.TASKS,
				method: 'POST',
				body: newTask,
			}),

			invalidatesTags: ['Task'],
		}),
		updateTask: builder.mutation<Task, Task>({
			query: updatedTask => ({
				url: `${ApiRoutes.TASKS}/${updatedTask.id}`,
				method: 'PUT',
				body: updatedTask,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: builder.mutation<void, number>({
			query: taskId => ({
				url: `${ApiRoutes.TASKS}/${taskId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Task'],
		}),
	}),
})

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = tasksApi
