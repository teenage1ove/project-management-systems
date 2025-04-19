import { configureStore } from '@reduxjs/toolkit'
import { boardsApi } from './boards-api'
import { tasksApi } from './tasks-api'

export const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		[boardsApi.reducerPath]: boardsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(tasksApi.middleware, boardsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
