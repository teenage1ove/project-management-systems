// components/TasksFilters.tsx
import { SearchOutlined } from '@ant-design/icons'
import { Flex, Input, TreeSelect } from 'antd'
import { useMemo, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

import { Status, Task } from '../api/api.types'

interface Filters {
	status: Status[]
	board: string[]
}

interface TasksFiltersProps {
	tasks?: Task[]
}

export function TasksFilters({ tasks }: TasksFiltersProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [filters, setFilters] = useState<Filters>({ status: [], board: [] })

	// Debounce для поискового запроса
	const debouncedSearchQuery = useDebounce(searchQuery, 500)

	// Заглушка для досок (заменить на useGetBoardsQuery)
	const boardOptions = [
		{ value: 'board1', title: 'Доска 1' },
		{ value: 'board2', title: 'Доска 2' },
		{ value: 'board3', title: 'Доска 3' },
	]

	// Данные для TreeSelect
	const treeData = [
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

	// Фильтрация задач
	const filteredTasks = useMemo(() => {
		return tasks?.filter(task => {
			const matchesSearch =
				!debouncedSearchQuery ||
				task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
				task.assignee.fullName
					.toLowerCase()
					.includes(debouncedSearchQuery.toLowerCase())

			const matchesStatus =
				filters.status.length === 0 || filters.status.includes(task.status)

			const matchesBoard =
				filters.board.length === 0 || filters.board.includes(task.boardId)

			return matchesSearch && matchesStatus && matchesBoard
		})
	}, [tasks, debouncedSearchQuery, filters])

	return (
		<>
			<Flex justify='space-between' align='center' gap='middle'>
				<Input
					style={{ maxWidth: 300 }}
					placeholder='Поиск по названию или исполнителю'
					onChange={e => setSearchQuery(e.target.value)}
					value={searchQuery}
					prefix={<SearchOutlined />}
					allowClear
				/>
				<TreeSelect
					treeData={treeData}
					placeholder='Фильтры'
					style={{ minWidth: '300px' }}
					multiple
					treeCheckable
					showCheckedStrategy={TreeSelect.SHOW_CHILD}
					onChange={(values: (Status | string)[]) => {
						const newFilters: Filters = { status: [], board: [] }
						values.forEach(value => {
							if (Object.values(Status).includes(value as Status)) {
								newFilters.status.push(value as Status)
							} else if (boardOptions.some(board => board.value === value)) {
								newFilters.board.push(value as string)
							}
						})
						setFilters(newFilters)
					}}
					value={[...filters.status, ...filters.board]}
					allowClear
				/>
			</Flex>
			{ <TasksList tasks={filteredTasks} />}
		</>
	)
}
