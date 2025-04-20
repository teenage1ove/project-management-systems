export interface UserResponse {
	data: User[]
}

export interface User {
	id: number
	fullName: string
	email: string
	description: string
	avatarUrl: string
	teamId: number
	teamName: string
	tasksCount: number
}

export interface TasksResponse {
	data: Task[]
}

export interface AddTaskRequest {
	title: string
	description: string
	boardId: number
	priority: Priority
	assigneeId: number
}

export interface UpdateTaskRequest {
	title: string
	description: string
	status: Status
	priority: Priority
	assigneeId: number
}

export interface UpdateStatusTaskRequest {
	status: Status
}

export interface Task {
	id: number
	title: string
	description: string
	priority: string
	status: string
	assignee: Assignee
	boardId: number
	boardName: string
}

export interface BoardResponse {
	data: Board[]
}

export interface BoardIdResponse {
	data: Task[]
}

export interface Assignee {
	id: number
	fullName: string
	email: string
	avatarUrl: string
}

export interface Board {
	id: number
	name: string
	description: string
	taskCount: number
}

export enum Status {
	Backlog = 'Backlog',
	InProgress = 'InProgress',
	Done = 'Done',
}

export enum Priority {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High',
}
