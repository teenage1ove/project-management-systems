import { Board, Status, Task } from '../api/api.types'

interface Filters {
	status: Status[]
	board: number[] 
}

// Формирование treeData для TreeSelect
export function getTreeData(boards: Board[]) {
	const boardOptions = boards.map(board => ({
		value: board.id,
		title: board.name,
	}))

	return [
		{
			value: 'status',
			title: 'По статусу задачи',
			selectable: false,
			children: Object.values(Status).map(status => ({
				value: status,
				title: status,
			})),
		},
		{
			value: 'board',
			title: 'По доске',
			selectable: false,
			children: boardOptions,
		},
	]
}

// Фильтрация задач
export function filterTasks(
	tasks: Task[] | undefined,
	searchQuery: string,
	filters: Filters
): Task[] | undefined {
	if (!tasks) return undefined

	return tasks.filter(task => {
		const matchesSearch =
			!searchQuery ||
			task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			task.assignee.fullName.toLowerCase().includes(searchQuery.toLowerCase())

		const matchesStatus =
			filters.status.length === 0 ||
			filters.status.includes(task.status as Status)

		const matchesBoard =
			filters.board.length === 0 || filters.board.includes(task.boardId)

		return matchesSearch && matchesStatus && matchesBoard
	})
}
