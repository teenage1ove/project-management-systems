import { ConfigProvider, theme } from 'antd'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Layout } from './layouts/Layout.tsx'
import { BoardPage } from './pages/BoardPage.tsx'
import { BoardsPage } from './pages/BoardsPage.tsx'
import { IssuesPage } from './pages/IssuesPage.tsx'
import { store } from './stores/root-store.ts'
import './styles/index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Navigate to='/issues' replace />,
			},
			{
				path: '/boards',
				element: <BoardsPage />,
			},
			{
				path: '/board/:id',
				element: <BoardPage />,
			},
			{
				path: '/issues',
				element: <IssuesPage />,
			},
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<RouterProvider router={router} />
		</ConfigProvider>
	</Provider>
)
