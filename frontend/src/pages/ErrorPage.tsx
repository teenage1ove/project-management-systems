import { Flex, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'

export function ErrorPage() {
	return (
		<Layout>
			<Content>
				<Flex
					style={{ height: '100vh' }}
					vertical
					justify='center'
					align='center'
				>
					<div style={{ fontSize: '100px' }}>404</div>
					<p style={{ fontSize: '30px' }}>Такой страницы не существует</p>
				</Flex>
			</Content>
		</Layout>
	)
}
