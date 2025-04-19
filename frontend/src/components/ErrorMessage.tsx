import { memo } from 'react'

export const ErrorMessage = memo(({ isError }: { isError: boolean }) => {
	if (!isError) return null
	const errorMessage = 'Произошла ошибка'
	return (
		<div style={{ color: 'red', textAlign: 'center' }}>
			{errorMessage}
		</div>
	)
})
