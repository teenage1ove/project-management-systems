import { Space, Spin } from 'antd'
import { ErrorMessage } from '../components/ErrorMessage'
import { ListItems } from '../components/ListItems'
import { useGetBoardsQuery } from '../stores/boards-api'

export function BoardsPage() {
	const {
		data: boards,
		isLoading: isBoardsLoading,
		isError: isBoardsError,
	} = useGetBoardsQuery()

	if (isBoardsError) {
		return <ErrorMessage isError={true} />
	}

	if (isBoardsLoading) {
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
			{boards && <ListItems type='boards' items={boards} />}
		</Space>
	)
}
