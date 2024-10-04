import { useAppViewStore } from '@/store'
import { useEffect } from 'react'
export default function useAppView() {
	const viewStore = useAppViewStore()
	useEffect(() => {
		localStorage.setItem('view', viewStore.view)
	}, [viewStore.view])
	return viewStore
}
