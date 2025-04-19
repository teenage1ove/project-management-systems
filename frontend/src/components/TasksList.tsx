// components/TasksList.jsx
import { Card, Image, List, Space } from 'antd'
import { Link } from 'react-router-dom'
import { ApiRoutes } from '../api/api.routes'
import { Task } from '../api/api.types'

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
	return (
		<List
			bordered
			pagination={{
				pageSize: 5,
			}}
			dataSource={tasks}
			renderItem={task => (
				<List.Item>
					<Card style={{ width: '100%' }}>
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
							<Link to={`${ApiRoutes.BOARD}/${task.boardId}`}>
								Перейти к доске
							</Link>
						</div>
					</Card>
				</List.Item>
			)}
		/>
	)
}
