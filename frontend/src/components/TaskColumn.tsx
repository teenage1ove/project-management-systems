import { useDroppable } from '@dnd-kit/core'
import { Card, Typography } from 'antd'
import { Status, Task } from '../api/api.types'
import { TaskCard } from './TaskCard'

const { Title } = Typography

interface TaskColumnProps {
	title: string
	status: Status
	tasks: Task[]
	onTaskClick: (task: Task) => void
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
	title,
	status,
	tasks,
	onTaskClick,
}) => {
	const { setNodeRef } = useDroppable({
		id: status,
	})

	return (
		<Card
			title={<Title level={4}>{title}</Title>}
			style={{ width: '350px', minHeight: 500, flexGrow: 1 }}
			ref={setNodeRef}
		>
			{tasks.map(task => (
				<TaskCard onClick={() => onTaskClick(task)} key={task.id} task={task} />
			))}
		</Card>
	)
}
