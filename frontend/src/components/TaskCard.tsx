import { useDraggable } from '@dnd-kit/core'
import { Card, Image, Space } from 'antd'
import { Task } from '../api/api.types'

interface TaskCardProps {
	task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id.toString(),
	})

	const styleTransform = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined

	return (
		<Card
			ref={setNodeRef}
			style={{
				marginBottom: 8,
				zIndex: 1000,
				width: '100%',
				cursor: 'pointer',
				...styleTransform,
			}}
			{...listeners}
			{...attributes}
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
		</Card>
	)
}
