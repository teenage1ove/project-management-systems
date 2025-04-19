export interface TasksResponse {
	data: Task[]
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

export interface Assignee {
	id: number
	fullName: string
	email: string
	avatarUrl: string
}

export interface BoardResponse {
	data: Board[]
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
