import { SearchOutlined } from '@ant-design/icons'
import { Flex, Input, Space, Spin, TreeSelect } from 'antd'
import { useMemo, useState } from 'react'
import { Status } from '../api/api.types'
import { ErrorMessage } from '../components/ErrorMessage'
import { ListItems } from '../components/ListItems'
import { useDebounce } from '../hooks/useDebounce'
import { useGetBoardsQuery } from '../stores/boards-api'
import { useGetTasksQuery } from '../stores/tasks-api'
import { filterTasks, getTreeData } from '../utils/tasksUtils'

interface Filters {
	status: Status[]
	board: number[]
}

export function IssuesPage() {
	const {
		data: tasks,
		isLoading: isTasksLoading,
		isError: isTasksError,
	} = useGetTasksQuery()
	const {
		data: boards,
		isLoading: isBoardsLoading,
		isError: isBoardsError,
	} = useGetBoardsQuery()
	const [searchQuery, setSearchQuery] = useState('')
	const [filters, setFilters] = useState<Filters>({ status: [], board: [] })

	// Debounce для поискового запроса
	const debouncedSearchQuery = useDebounce<string>(searchQuery, 300)

	// Данные для TreeSelect
	const treeData = useMemo(() => getTreeData(boards ?? []), [boards])

	// Фильтрация задач
	const filteredTasks = useMemo(
		() => filterTasks(tasks, debouncedSearchQuery, filters),
		[tasks, debouncedSearchQuery, filters]
	)

	// 	Функция обработки изменения фильтров
	const handleFilterChange = (values: (Status | number)[]) => {
		const newFilters: Filters = { status: [], board: [] }
		values.forEach(value => {
			if (Object.values(Status).includes(value as Status)) {
				newFilters.status.push(value as Status)
			} else if (boards?.some(board => board.id === value)) {
				newFilters.board.push(value as number)
			}
		})
		setFilters(newFilters)
	}

	if (isTasksError || isBoardsError) {
		return <ErrorMessage isError={true} />
	}

	if (isTasksLoading || isBoardsLoading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Spin />
			</div>
		)
	}

	return (
		<Space size={20} direction='vertical' style={{ width: '100%' }}>
			<Flex justify='space-between' align='center' gap='middle'>
				<Input
					style={{ maxWidth: 300 }}
					placeholder='Поиск'
					onChange={e => setSearchQuery(e.target.value)}
					value={searchQuery}
					prefix={<SearchOutlined />}
					allowClear
				/>
				<TreeSelect
					treeData={treeData}
					placeholder='Фильтры'
					style={{ minWidth: '300px', maxWidth: '800px' }}
					multiple
					showSearch={false}
					showCheckedStrategy={TreeSelect.SHOW_CHILD}
					onChange={handleFilterChange}
					value={[...filters.status, ...filters.board]}
					allowClear
				/>
			</Flex>
			{filteredTasks && <ListItems type='tasks' items={filteredTasks} />}
		</Space>
	)
}
