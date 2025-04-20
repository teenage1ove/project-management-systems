import { Layout as AntLayout, Button, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Modal } from '../components/Modal/Modal'

export function Layout() {
	const [showModal, setShowModal] = useState(false)
	const { pathname } = useLocation()

	// Определяем текущий маршрут для выделения пункта меню
	const pagePathname = pathname.split('/')[1] as 'issues' | 'boards'
	const selectedKey = pagePathname === 'issues' ? 'boards' : 'issues'

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
					selectedKeys={[selectedKey]}
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
				<Button type='primary' onClick={() => setShowModal(true)}>
					Создать задачу
				</Button>
			</Header>
			<Content style={{ padding: '24px 50px' }}>
				<Outlet />
			</Content>
			{showModal && (
				<Modal
					mode='create'
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
		</AntLayout>
	)
}
