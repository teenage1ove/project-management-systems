import { Layout as AntLayout, Button, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Link, Outlet } from 'react-router-dom'

export function Layout() {
	return (
		<AntLayout style={{ minHeight: '100vh' }}>
			<Header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					background: '#141414',
				}}
			>
				<Menu
					mode='horizontal'
					theme='dark'
					style={{
						background: 'transparent',
					}}
					defaultSelectedKeys={['boards']}
					items={[
						{
							key: 'boards',
							label: <Link to='/issues'>Все задачи</Link>,
							style: {
								marginRight: '15px',
							},
						},
						{
							key: 'issues',
							label: <Link to='/boards'>Проекты</Link>,
						},
					]}
				/>
				<Button type='primary' onClick={() => {}}>
					Создать задачу
				</Button>
			</Header>
			<Content style={{ padding: '24px 50px' }}>
				<Outlet />
			</Content>
		</AntLayout>
	)
}
