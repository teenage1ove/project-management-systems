import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Flex, Space, Typography, message } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Priority, Status } from '../api/api.types'
import { Modal } from '../components/Modal/Modal'
import { TaskColumn } from '../components/TaskColumn'
import { useGetBoardsQuery } from '../stores/boards-api'
import {
	useGetTasksByBoardIdQuery,
	useUpdateTaskMutation,
} from '../stores/tasks-api'

const { Title } = Typography

export const BoardPage = () => {
	const { id } = useParams<{ id: string }>()
	const { data: tasks, isLoading } = useGetTasksByBoardIdQuery(id ?? '')
	const { data: boards } = useGetBoardsQuery()
	const [updateTask] = useUpdateTaskMutation()
	const [showModal, setShowModal] = useState(false)

	function getBoard() {
		return boards?.find(b => b.id === Number(id))
	}

	const board = getBoard()

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event
		if (!over) return

		const taskId = Number(active.id)
		const newStatus = over.id as Status

		const task = tasks?.find(t => t.id === taskId)
		if (!task) return

		if (task.status === newStatus) return

		try {
			await updateTask({
				id: taskId,
				status: newStatus,
				title: task.title,
				description: task.description,
				priority: task.priority as Priority,
				assigneeId: task.assignee.id,
			}).unwrap()
			message.success('Статус задачи обновлён')
		} catch (error) {
			message.error('Ошибка при обновлении статуса задачи')
			console.error('Ошибка:', error)
		}
	}

	const columns: { status: Status; title: string }[] = [
		{ status: Status.Backlog, title: 'To do' },
		{ status: Status.InProgress, title: 'In progress' },
		{ status: Status.Done, title: 'Done' },
	]

	if (isLoading) return <div>Загрузка...</div>
	if (!tasks) return <div>Доска не найдена</div>

	return (
		<DndContext autoScroll={false} onDragEnd={handleDragEnd}>
			<Space direction='vertical' style={{ width: '100%' }}>
				<Title level={2} style={{ margin: 0 }}>
					{board?.name}
				</Title>

				<Flex gap='middle' style={{ overflowX: 'auto', marginTop: '15px' }}>
					{columns.map(column => (
						<TaskColumn
							key={column.status}
							title={column.title}
							status={column.status}
							tasks={tasks.filter(task => task.status === column.status)}
						/>
					))}
				</Flex>
			</Space>
			<Modal mode='create' showModal={showModal} setShowModal={setShowModal} />
		</DndContext>
	)
}
