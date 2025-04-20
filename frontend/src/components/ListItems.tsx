import { Card, Image, List, Space } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiRoutes } from '../api/api.routes'
import { Board, Task } from '../api/api.types'
import { Modal } from './Modal/Modal'

interface TasksListProps {
	type: 'tasks'
	items: Task[]
}

interface BoardsListProps {
	type: 'boards'
	items: Board[]
}

// Объединённый тип для пропсов
type UniversalListProps = TasksListProps | BoardsListProps

export const ListItems = ({ type, items }: UniversalListProps) => {
	const [showModal, setShowModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)

	// Обработчик клика по карточке
	const handleCardClick = (item: Task | Board) => {
		if (type === 'tasks') {
			setSelectedTask(item as Task)
			setShowModal(true)
		}
	}

	// Рендеринг карточки задачи
	const renderTask = (task: Task) => (
		<Card
			style={{ width: '100%', cursor: 'pointer' }}
			onClick={() => handleCardClick(task)}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Space direction='vertical' size={5}>
					<p>{task.title}</p>
					<Space>
						<Image
							width={35}
							style={{ borderRadius: '50%' }}
							src={task.assignee.avatarUrl}
						/>
						<span style={{ marginLeft: '10px', opacity: '0.7' }}>
							{task.assignee.fullName}
						</span>
					</Space>
				</Space>
			</div>
		</Card>
	)

	// Рендеринг карточки доски
	const renderBoard = (board: Board) => (
		<Card style={{ width: '100%' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<p>{board.name}</p>
				<Link to={`${ApiRoutes.BOARD}/${board.id}`}>Перейти к доске</Link>
			</div>
		</Card>
	)

	return (
		<>
			<List
				bordered
				pagination={{ pageSize: type === 'tasks' ? 5 : 7 }}
				dataSource={items}
				renderItem={(item: Task | Board) =>
					type === 'tasks' ? (
						<List.Item>{renderTask(item as Task)}</List.Item>
					) : (
						<List.Item>{renderBoard(item as Board)}</List.Item>
					)
				}
			/>
			{type === 'tasks' && selectedTask && (
				<Modal
					mode='edit'
					dataForm={selectedTask}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
		</>
	)
}
