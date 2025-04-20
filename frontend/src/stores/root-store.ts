import { configureStore } from '@reduxjs/toolkit'
import { boardsApi } from './boards-api'
import { tasksApi } from './tasks-api'
import { usersApi } from './users-api'

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		[boardsApi.reducerPath]: boardsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(tasksApi.middleware, boardsApi.middleware, usersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
