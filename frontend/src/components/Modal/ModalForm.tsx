import { Form, FormInstance, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Board, Priority, Status, User } from '../../api/api.types'
export interface EditFormValues extends CreateFormValues {
	status: Status
}

export interface CreateFormValues {
	title: string
	description: string
	boardId: number
	priority: Priority
	assigneeId: number
}

// Props for ModalForm
interface ModalFormProps {
	form: FormInstance<EditFormValues>
	mode: 'create' | 'edit'
	boards: Board[]
	users: User[]
	isBoardsLoading: boolean
	isUsersLoading: boolean
	boardIdFromUrl?: number
}

export const ModalForm = ({
	form,
	mode,
	boards,
	users,
	isBoardsLoading,
	isUsersLoading,
	boardIdFromUrl,
}: ModalFormProps) => {
	return (
		<Form form={form} layout='vertical'>
			<Form.Item
				name='title'
				label='Название'
				rules={[{ required: true, message: 'Введите название задачи' }]}
			>
				<Input placeholder='Название' />
			</Form.Item>
			<Form.Item
				name='description'
				label='Описание'
				rules={[{ required: true, message: 'Введите описание задачи' }]}
			>
				<TextArea rows={4} placeholder='Описание' />
			</Form.Item>
			<Form.Item
				name='boardId'
				label='Проект'
				rules={[{ required: true, message: 'Выберите проект' }]}
			>
				<Select
					placeholder='Выберите проект'
					loading={isBoardsLoading}
					options={boards?.map((board: Board) => ({
						value: board.id,
						label: board.name,
					}))}
					disabled={!!boardIdFromUrl || mode === 'edit'}
				/>
			</Form.Item>
			<Form.Item
				name='priority'
				label='Приоритет'
				rules={[{ required: true, message: 'Выберите приоритет' }]}
			>
				<Select placeholder='Выберите приоритет'>
					{Object.values(Priority).map(priority => (
						<Select.Option key={priority} value={priority}>
							{priority}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			{mode === 'edit' && (
				<Form.Item
					name='status'
					label='Статус'
					rules={[{ required: true, message: 'Выберите статус' }]}
				>
					<Select placeholder='Выберите статус'>
						{Object.values(Status).map(status => (
							<Select.Option key={status} value={status}>
								{status}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			<Form.Item
				name='assigneeId'
				label='Исполнитель'
				rules={[{ required: true, message: 'Выберите исполнителя' }]}
			>
				<Select
					placeholder='Выберите исполнителя'
					loading={isUsersLoading}
					options={users?.map((user: User) => ({
						value: user.id,
						label: user.fullName,
					}))}
				/>
			</Form.Item>
		</Form>
	)
}
