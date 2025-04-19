import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../stores/root-store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
