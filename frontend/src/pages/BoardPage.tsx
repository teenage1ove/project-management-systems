import { useParams } from 'react-router-dom'

export function BoardPage() {
	const {id} = useParams()
	return <div>BoardPage {id}</div>
}
