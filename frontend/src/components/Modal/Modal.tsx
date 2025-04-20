import { Modal as AntdModal, Button, Form, message } from 'antd'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApiRoutes } from '../../api/api.routes'
import { Priority, Status, Task } from '../../api/api.types'
import { useGetBoardsQuery } from '../../stores/boards-api'
import {
	useCreateTaskMutation,
	useUpdateTaskMutation,
} from '../../stores/tasks-api'
import { useGetUsersQuery } from '../../stores/users-api'
import { CreateFormValues, EditFormValues, ModalForm } from './ModalForm'

interface IModalProps {
	mode: 'create' | 'edit'
	dataForm?: Task
	showModal: boolean
	setShowModal: (value: boolean) => void
}

export function Modal({
	mode,
	dataForm,
	showModal,
	setShowModal,
}: IModalProps) {
	const [form] = Form.useForm<EditFormValues>()
	const { data: boards, isLoading: isBoardsLoading } = useGetBoardsQuery()
	const { data: users, isLoading: isUsersLoading } = useGetUsersQuery()
	const [createTask, { isLoading: isCreating }] = useCreateTaskMutation()
	const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()
	const { id } = useParams<{ id: string }>()
	const boardIdFromUrl = id ? Number(id) : undefined

	useEffect(() => {
		if (showModal) {
			const values: Partial<EditFormValues> = dataForm
				? {
						title: dataForm.title,
						description: dataForm.description,
						boardId: boardIdFromUrl || dataForm.boardId,
						status: dataForm.status as Status,
						priority: dataForm.priority as Priority,
						assigneeId: dataForm.assignee.id,
					}
				: boardIdFromUrl
					? { boardId: boardIdFromUrl }
					: {}
			form.setFieldsValue(values)
		}
	}, [showModal, dataForm, boardIdFromUrl, form])

	const handleSubmit = async () => {
		try {
			// Проверяем валидацию формы
			const values = await form.validateFields()

			// Если валидация прошла успешно, только тогда отправляем запрос
			if (values) {
				console.log('Форма прошла валидацию, значения:', values)

				if (mode === 'create') {
					const taskData: CreateFormValues = {
						assigneeId: values.assigneeId,
						boardId: values.boardId,
						description: values.description,
						priority: values.priority,
						title: values.title,
					}
					await createTask(taskData).unwrap()
					message.success('Задача успешно создана')
				} else {
					const taskData: EditFormValues & { id: number } = {
						...values,
						id: dataForm!.id,
					}
					await updateTask(taskData).unwrap()
					message.success('Задача успешно обновлена')
				}

				// Закрываем модальное окно и сбрасываем форму
				setShowModal(false)
				form.resetFields()
			}
		} catch (error) {
			// Если валидация не прошла, показываем сообщение
			message.error('Пожалуйста, заполните все обязательные поля')
			console.error('Ошибка валидации формы:', error)
		}
	}

	return (
		<AntdModal
			onCancel={() => setShowModal(false)}
			open={showModal}
			title={mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}
			footer={[
				<Button
					key='link'
					style={{ display: mode === 'create' || id ? 'none' : 'inline' }}
				>
					<Link to={`${ApiRoutes.BOARD}/${dataForm?.boardId}`}>
						Перейти на доску
					</Link>
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={handleSubmit}
					loading={isCreating || isUpdating}
				>
					{mode === 'create' ? 'Создать' : 'Обновить'}
				</Button>,
			]}
		>
			{boards && users && (
				<ModalForm
					form={form}
					mode={mode}
					boards={boards}
					users={users}
					isBoardsLoading={isBoardsLoading}
					isUsersLoading={isUsersLoading}
					boardIdFromUrl={boardIdFromUrl}
				/>
			)}
		</AntdModal>
	)
}
